
import { useState, useEffect, useCallback } from 'react';
import { UserMemory, UserInteraction, RecommendationFeedback } from '@/types/entities/user';

export const useUserMemory = (userId?: string) => {
  const [userMemory, setUserMemory] = useState<UserMemory | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock data for now until database is set up
  const mockUserMemory: UserMemory = {
    id: 'mock-memory-1',
    user_id: userId || 'current-user',
    location_history: ['Barcelona', 'Madrid', 'Lisbon'],
    venue_ratings: {
      '1': 5,
      '2': 4,
      'soho-house-barcelona': 5,
      'cafe-de-la-luz': 2
    },
    favorite_categories: ['rooftop bars', 'hidden gems', 'live music'],
    disliked_features: ['loud', 'crowded', 'touristy'],
    booking_history: [
      {
        venue_id: 'soho-house-barcelona',
        venue_name: 'Soho House Barcelona',
        timestamp: '2024-01-15T18:00:00Z',
        rating: 5
      },
      {
        venue_id: 'cafe-de-la-luz',
        venue_name: 'Café de la Luz',
        timestamp: '2024-01-10T14:30:00Z',
        rating: 2
      }
    ],
    language_tone_preference: 'witty',
    ai_feedback_summary: 'User prefers personalized recommendations with local insights. Appreciates brief, engaging responses.',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-15T12:00:00Z'
  };

  // Simulate loading user memory
  const fetchUserMemory = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setUserMemory(mockUserMemory);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user memory');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Update user memory (mock implementation)
  const updateUserMemory = useCallback(async (updates: Partial<UserMemory>) => {
    if (!userId || !userMemory) return;

    try {
      const updatedMemory = {
        ...userMemory,
        ...updates,
        updated_at: new Date().toISOString()
      };
      setUserMemory(updatedMemory);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user memory');
    }
  }, [userId, userMemory]);

  // Track user interaction (mock implementation)
  const trackInteraction = useCallback(async (interaction: Omit<UserInteraction, 'id' | 'user_id' | 'timestamp'>) => {
    if (!userId) return;
    
    console.log('Tracking interaction:', interaction);
    // Will implement database storage later
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
