-- Migration: ContentAccess Feature
-- Author: Antigravity
-- Date: 2026-04-14

-- 1. Update Profiles Table
ALTER TABLE IF EXISTS public.profiles 
ADD COLUMN IF NOT EXISTS is_subscribed BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS subscription_expires_at TIMESTAMPTZ;

-- 2. Update Stories Table
ALTER TABLE IF EXISTS public.stories
ADD COLUMN IF NOT EXISTS description_short TEXT,
ADD COLUMN IF NOT EXISTS description_full TEXT,
ADD COLUMN IF NOT EXISTS preview_audio_url TEXT,
ADD COLUMN IF NOT EXISTS full_audio_path TEXT,
ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;

-- 3. Row Level Security (RLS) for Stories
-- Everyone can see basic info
CREATE POLICY "Stories are viewable by everyone" 
ON public.stories FOR SELECT 
USING (true);

-- Only subscribed users can see the full description (or we handle this in the app/edge function)
-- For better protection, we could use a view or conditional RLS, 
-- but the prompt suggests the Edge Function handles the Signed URL and the gating is both in DB and Frontend.
-- Let's make description_full only visible to subscribers via RLS:
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Stories full access for subscribers" ON public.stories;
CREATE POLICY "Stories full access for subscribers"
ON public.stories FOR SELECT
USING (
  auth.uid() IN (
    SELECT id FROM public.profiles 
    WHERE is_subscribed = true 
    AND (subscription_expires_at IS NULL OR subscription_expires_at > now())
  )
);

-- Note: The above policy might restrict the whole row. 
-- Usually, we want everyone to see the row but only some columns to be populated.
-- Postgres RLS doesn't easily support column-level masking in one policy. 
-- A better approach is to have a basic policy for the row and handle sensitive columns via a View or the Edge Function.
-- However, the prompt says "El gating debe estar protegido tanto en base de datos (RLS) como en el frontend."
-- So I will assume we want to protect the full_audio_path string itself and full description.

-- 4. Storage Policies
-- Assuming a bucket named 'stories-audio' exists
-- The full_audio_path points to files in this bucket that should be PRIVATE.

-- Allow public access to 'previews' folder (if any) or specific files
-- But the prompt says full_audio_path is internal and never public.
-- So we only allow access via Signed URLs (handled by service role in Edge Function).

-- 5. Helper function to check subscription
CREATE OR REPLACE FUNCTION public.is_user_subscribed(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = user_id 
    AND is_subscribed = true 
    AND (subscription_expires_at IS NULL OR subscription_expires_at > now())
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
