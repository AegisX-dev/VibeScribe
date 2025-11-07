import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';

// Database types - extend this as needed based on your schema
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          role: string | null;
          project_name: string | null;
          project_description: string | null;
          target_audience: string | null;
          style_keywords: string | null;
          source_url: string | null;
          instagram_username: string | null;
          twitter_username: string | null;
          linkedin_username: string | null;
          legacy_other_details: string | null;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          role?: string | null;
          project_name?: string | null;
          project_description?: string | null;
          target_audience?: string | null;
          style_keywords?: string | null;
          source_url?: string | null;
          instagram_username?: string | null;
          twitter_username?: string | null;
          linkedin_username?: string | null;
          legacy_other_details?: string | null;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          role?: string | null;
          project_name?: string | null;
          project_description?: string | null;
          target_audience?: string | null;
          style_keywords?: string | null;
          source_url?: string | null;
          instagram_username?: string | null;
          twitter_username?: string | null;
          linkedin_username?: string | null;
          legacy_other_details?: string | null;
        };
      };
    };
  };
};

// Client-side Supabase client (for use in Client Components)
export const createBrowserClient = () => {
  return createClientComponentClient<Database>();
};

// Alternative client for server-side usage
export const createServerClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createClient<Database>(supabaseUrl, supabaseAnonKey);
};
