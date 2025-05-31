
import { useState, useCallback } from 'react';
import { Location } from '@/types';

export interface Trip {
  id: string;
  name: string;
  description?: string;
  locations: Location[];
  createdAt: Date;
  updatedAt: Date;
}

export const useTripManager = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);

  const createTrip = useCallback((name: string, description?: string) => {
    const newTrip: Trip = {
      id: `trip-${Date.now()}`,
      name,
      description,
      locations: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setTrips(prev => [...prev, newTrip]);
    return newTrip;
  }, []);

  const addLocationToTrip = useCallback((tripId: string, location: Location) => {
    setTrips(prev => prev.map(trip => {
      if (trip.id === tripId) {
        return {
          ...trip,
          locations: [...trip.locations, location],
          updatedAt: new Date()
        };
      }
      return trip;
    }));
  }, []);

  const removeLocationFromTrip = useCallback((tripId: string, locationId: string) => {
    setTrips(prev => prev.map(trip => {
      if (trip.id === tripId) {
        return {
          ...trip,
          locations: trip.locations.filter(loc => loc.id !== locationId),
          updatedAt: new Date()
        };
      }
      return trip;
    }));
  }, []);

  const deleteTrip = useCallback((tripId: string) => {
    setTrips(prev => prev.filter(trip => trip.id !== tripId));
    if (currentTrip?.id === tripId) {
      setCurrentTrip(null);
    }
  }, [currentTrip]);

  const calculateTripDuration = useCallback((trip: Trip) => {
    // Simple calculation: assume 1 hour per location plus travel time
    const baseHours = trip.locations.length;
    const travelTime = Math.max(0, trip.locations.length - 1) * 0.5; // 30 min travel between locations
    return baseHours + travelTime;
  }, []);

  return {
    trips,
    currentTrip,
    setCurrentTrip,
    createTrip,
    addLocationToTrip,
    removeLocationFromTrip,
    deleteTrip,
    calculateTripDuration
  };
};
