
import { StateCreator } from 'zustand';
import { AppStore, VenueSlice, Venue } from './types';
import { useAppStore } from './appStore';

export const createVenueSlice: StateCreator<
  AppStore,
  [["zustand/immer", never]],
  [],
  VenueSlice
> = (set) => ({
  venues: [],
  followedVenues: [],
  currentVenue: null,
  
  followVenue: (venue: Venue) => {
    set((state) => {
      const existingIndex = state.followedVenues.findIndex(v => v.id === venue.id);
      if (existingIndex === -1) {
        state.followedVenues.push({ ...venue, isFollowed: true });
      }
    });
  },
  
  unfollowVenue: (venueId: string) => {
    set((state) => {
      state.followedVenues = state.followedVenues.filter(v => v.id !== venueId);
    });
  },
  
  setCurrentVenue: (venue: Venue | null) => {
    set((state) => {
      state.currentVenue = venue;
    });
  },
  
  updateVenue: (venueId: string, updates: Partial<Venue>) => {
    set((state) => {
      // Update in venues array
      const venueIndex = state.venues.findIndex(v => v.id === venueId);
      if (venueIndex !== -1) {
        Object.assign(state.venues[venueIndex], updates);
      }
      
      // Update in followed venues
      const followedIndex = state.followedVenues.findIndex(v => v.id === venueId);
      if (followedIndex !== -1) {
        Object.assign(state.followedVenues[followedIndex], updates);
      }
      
      // Update current venue if it matches
      if (state.currentVenue?.id === venueId) {
        Object.assign(state.currentVenue, updates);
      }
    });
  },
});

// Export individual store hook
export const useVenueStore = () => {
  const { 
    venues, 
    followedVenues, 
    currentVenue, 
    followVenue, 
    unfollowVenue, 
    setCurrentVenue, 
    updateVenue 
  } = useAppStore();
  
  return { 
    venues, 
    followedVenues, 
    currentVenue, 
    followVenue, 
    unfollowVenue, 
    setCurrentVenue, 
    updateVenue 
  };
};
