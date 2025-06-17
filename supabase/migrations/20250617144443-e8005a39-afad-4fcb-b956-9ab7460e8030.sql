
-- Create table for venue audio summaries
CREATE TABLE IF NOT EXISTS public.venue_audio_summaries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  venue_id TEXT NOT NULL UNIQUE,
  script_text TEXT NOT NULL,
  audio_url TEXT NOT NULL,
  generated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  file_size_bytes INTEGER,
  duration_seconds INTEGER
);

-- Add Row Level Security
ALTER TABLE public.venue_audio_summaries ENABLE ROW LEVEL SECURITY;

-- Create policy that allows everyone to read audio summaries (public venue data)
CREATE POLICY "Anyone can view venue audio summaries" 
  ON public.venue_audio_summaries 
  FOR SELECT 
  USING (true);

-- Create policy that allows service role to insert/update audio summaries
CREATE POLICY "Service role can manage audio summaries" 
  ON public.venue_audio_summaries 
  FOR ALL 
  USING (true);

-- Create index for faster venue lookups
CREATE INDEX IF NOT EXISTS idx_venue_audio_summaries_venue_id 
  ON public.venue_audio_summaries(venue_id);

-- Add trigger to update the updated_at column
CREATE TRIGGER update_venue_audio_summaries_updated_at
  BEFORE UPDATE ON public.venue_audio_summaries
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
