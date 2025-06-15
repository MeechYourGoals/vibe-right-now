
import { StateCreator } from 'zustand';
import { AppStore, LocationSlice, Location } from './types';
import { useAppStore } from './appStore';

export const createLocationSlice: StateCreator<
  AppStore,
  [["zustand/immer", never]],
  [],
  LocationSlice
> = (set) => ({
  locations: [],
  nearbyLocations: [],
  selectedLocation: null,
  searchResults: [],
  isLoading: false,
  
  setLocations: (locations: Location[]) => {
    set((state) => {
      state.locations = locations;
    });
  },
  
  setNearbyLocations: (locations: Location[]) => {
    set((state) => {
      state.nearbyLocations = locations;
    });
  },
  
  setSelectedLocation: (location: Location | null) => {
    set((state) => {
      state.selectedLocation = location;
    });
  },
  
  setSearchResults: (results: Location[]) => {
    set((state) => {
      state.searchResults = results;
    });
  },
  
  setLoading: (loading: boolean) => {
    set((state) => {
      state.isLoading = loading;
    });
  },
});

// Export individual store hook
export const useLocationStore = () => {
  const { 
    locations, 
    nearbyLocations, 
    selectedLocation, 
    searchResults, 
    isLoading,
    setLocations, 
    setNearbyLocations, 
    setSelectedLocation, 
    setSearchResults, 
    setLoading 
  } = useAppStore();
  
  return { 
    locations, 
    nearbyLocations, 
    selectedLocation, 
    searchResults, 
    isLoading,
    setLocations, 
    setNearbyLocations, 
    setSelectedLocation, 
    setSearchResults, 
    setLoading 
  };
};
