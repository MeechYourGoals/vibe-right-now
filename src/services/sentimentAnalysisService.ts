
import { supabase } from "@/integrations/supabase/client";
import { VenueSentimentAnalysis } from "@/types";

export const getSentimentAnalysis = async (venueId: string): Promise<VenueSentimentAnalysis[]> => {
  try {
    const { data, error } = await supabase
      .from('venue_sentiment_analysis')
      .select('*')
      .eq('venue_id', venueId);

    if (error) {
      console.error('Error fetching sentiment analysis:', error);
      throw error;
    }

    // Transform the data to match our interface, handling the Json type properly
    const transformedData: VenueSentimentAnalysis[] = data?.map(item => ({
      ...item,
      themes: typeof item.themes === 'object' && item.themes !== null ? 
        item.themes as Record<string, number> : {}
    })) || [];

    return transformedData;
  } catch (error) {
    console.error('Error in getSentimentAnalysis:', error);
    throw error;
  }
};

export const createSentimentAnalysis = async (
  venueId: string,
  platform: string,
  overallSentiment: number,
  sentimentSummary: string,
  themes: Record<string, number>,
  reviewCount: number
): Promise<VenueSentimentAnalysis> => {
  try {
    const { data, error } = await supabase
      .from('venue_sentiment_analysis')
      .insert({
        venue_id: venueId,
        platform,
        overall_sentiment: overallSentiment,
        sentiment_summary: sentimentSummary,
        themes: themes as any, // Cast to any for Json type compatibility
        review_count: reviewCount
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating sentiment analysis:', error);
      throw error;
    }

    // Transform the returned data to match our interface
    const transformedData: VenueSentimentAnalysis = {
      ...data,
      themes: typeof data.themes === 'object' && data.themes !== null ? 
        data.themes as Record<string, number> : {}
    };

    return transformedData;
  } catch (error) {
    console.error('Error in createSentimentAnalysis:', error);
    throw error;
  }
};

export const updateSentimentAnalysis = async (
  id: string,
  updates: Partial<Omit<VenueSentimentAnalysis, 'id' | 'created_at' | 'updated_at'>>
): Promise<VenueSentimentAnalysis> => {
  try {
    const updateData = {
      ...updates,
      themes: updates.themes ? updates.themes as any : undefined // Cast themes for Json compatibility
    };

    const { data, error } = await supabase
      .from('venue_sentiment_analysis')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating sentiment analysis:', error);
      throw error;
    }

    // Transform the returned data to match our interface
    const transformedData: VenueSentimentAnalysis = {
      ...data,
      themes: typeof data.themes === 'object' && data.themes !== null ? 
        data.themes as Record<string, number> : {}
    };

    return transformedData;
  } catch (error) {
    console.error('Error in updateSentimentAnalysis:', error);
    throw error;
  }
};

export const deleteSentimentAnalysis = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('venue_sentiment_analysis')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting sentiment analysis:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in deleteSentimentAnalysis:', error);
    throw error;
  }
};
