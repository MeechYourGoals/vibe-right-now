import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { UserMemory, UserInteraction, RecommendationFeedback } from '@/types/entities/user';

export const useUserMemory = (userId?: string) => {
  const [userMemory, setUserMemory] = useState<UserMemory | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch user memory from database
  const fetchUserMemory = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_memory')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw error;
      }

      if (data) {
        setUserMemory(data);
      } else {
        // Create default user memory if none exists
        const defaultMemory: Partial<UserMemory> = {
          user_id: userId,
          location_history: [],
          venue_ratings: {},
          favorite_categories: [],
          disliked_features: [],
          booking_history: [],
          language_tone_preference: 'friendly',
          ai_feedback_summary: ''
        };

        const { data: newMemory, error: createError } = await supabase
          .from('user_memory')
          .insert(defaultMemory)
          .select()
          .single();

        if (createError) throw createError;
        setUserMemory(newMemory);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user memory');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Update user memory
  const updateUserMemory = useCallback(async (updates: Partial<UserMemory>) => {
    if (!userId || !userMemory) return;

    try {
      const { data, error } = await supabase
        .from('user_memory')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;
      setUserMemory(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user memory');
    }
  }, [userId, userMemory]);

  // Track user interaction
  const trackInteraction = useCallback(async (interaction: Omit<UserInteraction, 'id' | 'user_id' | 'timestamp'>) => {
    if (!userId) return;

    try {
      await supabase
        .from('user_interactions')
        .insert({
          ...interaction,
          user_id: userId,
          timestamp: new Date().toISOString()
        });
    } catch (err) {
      console.error('Failed to track interaction:', err);
    }
  }, [userId]);

  // Add venue rating
  const addVenueRating = useCallback(async (venueId: string, rating: number, venueName?: string) => {
    if (!userMemory) return;

    const updatedRatings = {
      ...userMemory.venue_ratings,
      [venueId]: rating
    };

    const updatedBookingHistory = [...userMemory.booking_history];
    const existingBooking = updatedBookingHistory.find(b => b.venue_id === venueId);
    
    if (existingBooking) {
      existingBooking.rating = rating;
    } else if (venueName) {
      updatedBookingHistory.push({
        venue_id: venueId,
        venue_name: venueName,
        timestamp: new Date().toISOString(),
        rating
      });
    }

    await updateUserMemory({
      venue_ratings: updatedRatings,
      booking_history: updatedBookingHistory
    });

    await trackInteraction({
      interaction_type: 'venue_rating',
      venue_id: venueId,
      rating
    });
  }, [userMemory, updateUserMemory, trackInteraction]);

  // Add to location history
  const addLocationToHistory = useCallback(async (location: string) => {
    if (!userMemory) return;

    const updatedHistory = [...userMemory.location_history];
    if (!updatedHistory.includes(location)) {
      updatedHistory.push(location);
      // Keep only last 10 locations
      if (updatedHistory.length > 10) {
        updatedHistory.shift();
      }

      await updateUserMemory({
        location_history: updatedHistory
      });
    }
  }, [userMemory, updateUserMemory]);

  // Update preferences
  const updatePreferences = useCallback(async (
    favoriteCategories?: string[],
    dislikedFeatures?: string[],
    languageTone?: string
  ) => {
    const updates: Partial<UserMemory> = {};
    
    if (favoriteCategories) updates.favorite_categories = favoriteCategories;
    if (dislikedFeatures) updates.disliked_features = dislikedFeatures;
    if (languageTone) updates.language_tone_preference = languageTone;

    await updateUserMemory(updates);
  }, [updateUserMemory]);

  // Generate AI context from user memory
  const generateAIContext = useCallback(() => {
    if (!userMemory) return '';

    const recentRatings = Object.entries(userMemory.venue_ratings)
      .slice(-5)
      .map(([venueId, rating]) => {
        const booking = userMemory.booking_history.find(b => b.venue_id === venueId);
        return `${booking?.venue_name || venueId} (rated ${rating}/5)`;
      });

    const context = `
User Memory Snapshot:
- Recent locations: ${userMemory.location_history.slice(-3).join(', ')}
- Favorite categories: ${userMemory.favorite_categories.join(', ')}
- Recent venue ratings: ${recentRatings.join(', ')}
- Dislikes: ${userMemory.disliked_features.join(', ')}
- Communication style: ${userMemory.language_tone_preference}
- AI feedback summary: ${userMemory.ai_feedback_summary}
    `.trim();

    return context;
  }, [userMemory]);

  useEffect(() => {
    fetchUserMemory();
  }, [fetchUserMemory]);

  return {
    userMemory,
    loading,
    error,
    updateUserMemory,
    trackInteraction,
    addVenueRating,
    addLocationToHistory,
    updatePreferences,
    generateAIContext,
    refreshMemory: fetchUserMemory
  };
};
