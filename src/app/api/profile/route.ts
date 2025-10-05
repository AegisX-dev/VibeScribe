import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Parse the profile data from the request body
    const body = await request.json();
    const { 
      id,
      full_name, 
      instagram_username, 
      twitter_username, 
      linkedin_username, 
      other_details 
    } = body;

    // Validate that an ID is provided
    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required.' },
        { status: 400 }
      );
    }

    // Validate that at least some data is provided
    if (!full_name && !instagram_username && !twitter_username && !linkedin_username && !other_details) {
      return NextResponse.json(
        { error: 'At least one field must be provided.' },
        { status: 400 }
      );
    }

    // Perform an upsert operation on the profiles table
    const profileData = {
      id: id,
      full_name: full_name || null,
      instagram_username: instagram_username || null,
      twitter_username: twitter_username || null,
      linkedin_username: linkedin_username || null,
      other_details: other_details || null,
    };

    const { data, error: upsertError } = await supabase
      .from('profiles')
      .upsert(profileData)
      .select()
      .single();

    // If there was an error during the upsert, return 500
    if (upsertError) {
      console.error('Database error:', upsertError);
      console.error('Error details:', JSON.stringify(upsertError, null, 2));
      return NextResponse.json(
        { 
          error: 'Failed to save profile data. Please try again.',
          details: upsertError.message || 'Unknown error'
        },
        { status: 500 }
      );
    }

    // Return success response with the saved profile data
    return NextResponse.json(
      { 
        message: 'Profile saved successfully!',
        profile: data 
      },
      { status: 200 }
    );

  } catch (error) {
    // Catch any unexpected errors
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

// GET handler to retrieve the user's profile
export async function GET(request: NextRequest) {
  try {
    // Get user ID from query parameter
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');

    if (!userId) {
      return NextResponse.json(
        { profile: null, message: 'No user ID provided.' },
        { status: 200 }
      );
    }

    // Fetch the user's profile from the database
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    // If no profile exists yet, return null (not an error)
    if (fetchError && fetchError.code === 'PGRST116') {
      return NextResponse.json(
        { profile: null, message: 'No profile found. Please create one.' },
        { status: 200 }
      );
    }

    // If there was another error, return 500
    if (fetchError) {
      console.error('Database error:', fetchError);
      return NextResponse.json(
        { error: 'Failed to fetch profile data.' },
        { status: 500 }
      );
    }

    // Return the profile data
    return NextResponse.json(
      { profile },
      { status: 200 }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}

// DELETE handler to remove the user's profile
export async function DELETE(request: NextRequest) {
  try {
    // Get user ID from query parameter
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required.' },
        { status: 400 }
      );
    }

    // Delete the profile from the database
    const { data, error: deleteError } = await supabase
      .from('profiles')
      .delete()
      .eq('id', userId)
      .select();

    if (deleteError) {
      console.error('Database error:', deleteError);
      return NextResponse.json(
        { error: 'Failed to delete profile. Please try again.' },
        { status: 500 }
      );
    }

    // Check if any rows were actually deleted
    if (!data || data.length === 0) {
      console.warn('No profile found to delete for user ID:', userId);
      return NextResponse.json(
        { message: 'No profile found to delete.' },
        { status: 404 }
      );
    }

    console.log('Successfully deleted profile for user ID:', userId);

    // Return success response
    return NextResponse.json(
      { message: 'Profile deleted successfully!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
