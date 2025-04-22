
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  orderBy, 
  limit, 
  startAfter,
  GeoPoint,
  serverTimestamp,
  setDoc
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import { Location } from '@/types';
import { EventItem } from '@/components/venue/events/types';

// Locations (Venues) Service
export const LocationService = {
  // Get all locations
  getAllLocations: async (): Promise<Location[]> => {
    try {
      const locationsRef = collection(db, 'locations');
      const snapshot = await getDocs(locationsRef);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Location[];
    } catch (error) {
      console.error('Error getting locations:', error);
      return [];
    }
  },
  
  // Get location by ID
  getLocationById: async (id: string): Promise<Location | null> => {
    try {
      const docRef = doc(db, 'locations', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        } as Location;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting location:', error);
      return null;
    }
  },
  
  // Get locations by city
  getLocationsByCity: async (city: string): Promise<Location[]> => {
    try {
      const locationsRef = collection(db, 'locations');
      const q = query(locationsRef, where('city', '==', city));
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Location[];
    } catch (error) {
      console.error('Error getting locations by city:', error);
      return [];
    }
  },
  
  // Get locations by type (restaurant, bar, etc.)
  getLocationsByType: async (type: string): Promise<Location[]> => {
    try {
      const locationsRef = collection(db, 'locations');
      const q = query(locationsRef, where('type', '==', type));
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Location[];
    } catch (error) {
      console.error('Error getting locations by type:', error);
      return [];
    }
  },
  
  // Get nearby locations
  getNearbyLocations: async (lat: number, lng: number, radiusKm: number = 10): Promise<Location[]> => {
    try {
      // Note: This requires a Firestore extension or Cloud Function to calculate distances
      // For now, we'll get all locations and filter client-side
      const locationsRef = collection(db, 'locations');
      const snapshot = await getDocs(locationsRef);
      
      const locations = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Location[];
      
      // Filter locations within the specified radius
      return locations.filter(location => {
        const distance = calculateDistance(lat, lng, location.lat, location.lng);
        return distance <= radiusKm;
      });
    } catch (error) {
      console.error('Error getting nearby locations:', error);
      return [];
    }
  },
  
  // Create a new location
  createLocation: async (location: Omit<Location, 'id'>): Promise<string> => {
    try {
      const locationsRef = collection(db, 'locations');
      const newLocation = {
        ...location,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      const docRef = await addDoc(locationsRef, newLocation);
      return docRef.id;
    } catch (error) {
      console.error('Error creating location:', error);
      throw error;
    }
  },
  
  // Update a location
  updateLocation: async (id: string, location: Partial<Location>): Promise<void> => {
    try {
      const docRef = doc(db, 'locations', id);
      await updateDoc(docRef, {
        ...location,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating location:', error);
      throw error;
    }
  },
  
  // Delete a location
  deleteLocation: async (id: string): Promise<void> => {
    try {
      const docRef = doc(db, 'locations', id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting location:', error);
      throw error;
    }
  }
};

// Events Service
export const EventService = {
  // Get all events
  getAllEvents: async (): Promise<EventItem[]> => {
    try {
      const eventsRef = collection(db, 'events');
      const snapshot = await getDocs(eventsRef);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as EventItem[];
    } catch (error) {
      console.error('Error getting events:', error);
      return [];
    }
  },
  
  // Get event by ID
  getEventById: async (id: string): Promise<EventItem | null> => {
    try {
      const docRef = doc(db, 'events', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        } as EventItem;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting event:', error);
      return null;
    }
  },
  
  // Get events by type (music, comedy, etc.)
  getEventsByType: async (type: string): Promise<EventItem[]> => {
    try {
      const eventsRef = collection(db, 'events');
      const q = query(eventsRef, where('type', '==', type));
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as EventItem[];
    } catch (error) {
      console.error('Error getting events by type:', error);
      return [];
    }
  },
  
  // Get events for a specific venue
  getEventsByVenue: async (venueId: string): Promise<EventItem[]> => {
    try {
      const eventsRef = collection(db, 'events');
      const q = query(eventsRef, where('venueId', '==', venueId));
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as EventItem[];
    } catch (error) {
      console.error('Error getting events by venue:', error);
      return [];
    }
  },
  
  // Get upcoming events
  getUpcomingEvents: async (limit: number = 10): Promise<EventItem[]> => {
    try {
      const eventsRef = collection(db, 'events');
      const currentDate = new Date().toISOString().split('T')[0]; // Get current date as YYYY-MM-DD
      const q = query(
        eventsRef,
        where('date', '>=', currentDate),
        orderBy('date', 'asc'),
        limit(limit)
      );
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as EventItem[];
    } catch (error) {
      console.error('Error getting upcoming events:', error);
      return [];
    }
  },
  
  // Create a new event
  createEvent: async (event: Omit<EventItem, 'id'>): Promise<string> => {
    try {
      const eventsRef = collection(db, 'events');
      const newEvent = {
        ...event,
        createdAt: serverTimestamp()
      };
      
      const docRef = await addDoc(eventsRef, newEvent);
      return docRef.id;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  },
  
  // Update an event
  updateEvent: async (id: string, event: Partial<EventItem>): Promise<void> => {
    try {
      const docRef = doc(db, 'events', id);
      await updateDoc(docRef, {
        ...event,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  },
  
  // Delete an event
  deleteEvent: async (id: string): Promise<void> => {
    try {
      const docRef = doc(db, 'events', id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  }
};

// Helper function to calculate distance between two points using Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}
