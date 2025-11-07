-- ALTER TABLE script for public.profiles
-- Adds new columns for enhanced user profile information

ALTER TABLE public.profiles
ADD COLUMN role TEXT DEFAULT NULL,
ADD COLUMN project_name TEXT DEFAULT NULL,
ADD COLUMN project_description TEXT DEFAULT NULL,
ADD COLUMN target_audience TEXT DEFAULT NULL,
ADD COLUMN style_keywords TEXT DEFAULT NULL,
ADD COLUMN source_url TEXT DEFAULT NULL;

-- Rename existing column
ALTER TABLE public.profiles
RENAME COLUMN other_details TO legacy_other_details;

-- Verify the changes
-- SELECT column_name, data_type, is_nullable, column_default
-- FROM information_schema.columns
-- WHERE table_schema = 'public' AND table_name = 'profiles'
-- ORDER BY ordinal_position;
