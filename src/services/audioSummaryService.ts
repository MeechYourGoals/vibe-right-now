
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface AudioSummary {
  venue_id: string;
  script_text: string;
  audio_url: string;
  generated_at: string;
  updated_at: string;
}

export const AudioSummaryService = {
  async getAudioSummary(venueId: string): Promise<AudioSummary | null> {
    try {
      const { data, error } = await supabase
        .from('venue_audio_summaries')
        .select('*')
        .eq('venue_id', venueId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching audio summary:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in getAudioSummary:', error);
      return null;
    }
  },

  async generateAudioSummary(venueId: string, venueName: string, reviewsText?: string, sentimentSummary?: string): Promise<AudioSummary | null> {
    try {
      const { data, error } = await supabase.functions.invoke('generate-audio-summary', {
        body: {
          venue_id: venueId,
          venue_name: venueName,
          reviews_text: reviewsText || '',
          sentiment_summary: sentimentSummary || ''
        }
      });

      if (error) {
        console.error('Error generating audio summary:', error);
        toast.error('Failed to generate audio summary');
        return null;
      }

      if (data?.success) {
        toast.success('Audio summary generated successfully!');
        return {
          venue_id: venueId,
          script_text: data.script,
          audio_url: data.audio_url,
          generated_at: data.generated_at,
          updated_at: data.generated_at
        };
      }

      return null;
    } catch (error) {
      console.error('Error in generateAudioSummary:', error);
      toast.error('Failed to generate audio summary');
      return null;
    }
  },

  async triggerBatchGeneration(): Promise<void> {
    try {
      toast.info('Starting batch audio generation...');
      
      // This would trigger a background job to generate audio for all venues
      const { error } = await supabase.functions.invoke('batch-generate-audio-summaries');
      
      if (error) {
        console.error('Error starting batch generation:', error);
        toast.error('Failed to start batch generation');
        return;
      }

      toast.success('Batch generation started! Audio summaries will be generated over the next few hours.');
    } catch (error) {
      console.error('Error in triggerBatchGeneration:', error);
      toast.error('Failed to start batch generation');
    }
  }
};
