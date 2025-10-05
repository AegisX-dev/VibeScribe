-- VibeScribe Supabase Database Setup
-- This script creates the profiles table and sets up Row Level Security (RLS) policies

-- Create the profiles table
CREATE TABLE IF NOT EXISTS profiles (
    id TEXT PRIMARY KEY,
    full_name TEXT,
    instagram_username TEXT,
    twitter_username TEXT,
    linkedin_username TEXT,
    other_details TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create an index on the id column for faster lookups
CREATE INDEX IF NOT EXISTS idx_profiles_id ON profiles(id);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for clean setup)
DROP POLICY IF EXISTS "Allow public read access" ON profiles;
DROP POLICY IF EXISTS "Allow public insert access" ON profiles;
DROP POLICY IF EXISTS "Allow public update access" ON profiles;
DROP POLICY IF EXISTS "Allow public delete access" ON profiles;

-- Create RLS policies for public access
-- Note: These policies allow unrestricted access. In production, you should
-- implement proper authentication and restrict access based on user identity.

-- Policy 1: Allow anyone to read profiles
CREATE POLICY "Allow public read access"
    ON profiles
    FOR SELECT
    USING (true);

-- Policy 2: Allow anyone to insert profiles
CREATE POLICY "Allow public insert access"
    ON profiles
    FOR INSERT
    WITH CHECK (true);

-- Policy 3: Allow anyone to update profiles
CREATE POLICY "Allow public update access"
    ON profiles
    FOR UPDATE
    USING (true)
    WITH CHECK (true);

-- Policy 4: Allow anyone to delete profiles
CREATE POLICY "Allow public delete access"
    ON profiles
    FOR DELETE
    USING (true);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to call the function before any update
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Verification queries (uncomment to run after setup)
-- SELECT * FROM profiles;
-- SELECT tablename, policyname, permissive, roles, cmd, qual FROM pg_policies WHERE tablename = 'profiles';
