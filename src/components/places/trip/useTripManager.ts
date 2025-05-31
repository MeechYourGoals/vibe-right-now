
import { useState, useEffect } from 'react';
import { mockUsers } from "@/mock/data";
import { DateRange } from 'react-day-picker';
import { toast } from "sonner";

interface Trip {
  id: string;
  name: string;
  destination: string;
  description: string;
  startDate: string; // Changed from Date to string to fix the type error
  endDate: string; // Changed from Date to string to fix the type error
  collaborators: {
    id: string;
    name: string;
    avatar: string;
  }[];
  savedPlaces: number;
}

interface UseTripManagerReturn {
  trips: Trip[];
  createTrip: (tripData: {
    name: string;
    destination: string;
    description: string;
    dateRange: DateRange;
  }) => void;
  deleteTrip: (tripId: string) => void;
  inviteUserToTrip: (tripId: string, email: string) => void;
}

export const useTripManager = (): UseTripManagerReturn => {
  const [trips, setTrips] = useState<Trip[]>([]);

  // Initialize trips from localStorage or defaults
  useEffect(() => {
    const storedTrips = localStorage.getItem('trips');
    if (storedTrips) {
      try {
        // Parse dates correctly
        const parsedTrips = JSON.parse(storedTrips);
        setTrips(parsedTrips);
      } catch (err) {
        console.error('Error parsing stored trips:', err);
        // Fallback to default trips
        setTrips(getDefaultTrips());
      }
    } else {
      // Use default trips
      const defaultTrips = getDefaultTrips();
      setTrips(defaultTrips);
      // Save to localStorage
      localStorage.setItem('trips', JSON.stringify(defaultTrips));
    }
  }, []);

  const getDefaultTrips = (): Trip[] => {
    return [
      {
        id: "1",
        name: "Summer in Paris",
        destination: "Paris, France",
        description: "Family vacation exploring the City of Light",
        startDate: "2025-07-15",
        endDate: "2025-07-22",
        collaborators: [
          { id: "1", name: mockUsers[0].name, avatar: mockUsers[0].avatar },
          { id: "2", name: "Mom", avatar: mockUsers[1].avatar },
          { id: "3", name: "Stacy", avatar: mockUsers[2].avatar },
        ],
        savedPlaces: 8
      },
      {
        id: "2",
        name: "Tokyo Adventure",
        destination: "Tokyo, Japan",
        description: "Exploring Japanese culture and cuisine",
        startDate: "2025-10-05",
        endDate: "2025-10-15",
        collaborators: [
          { id: "1", name: mockUsers[0].name, avatar: mockUsers[0].avatar },
          { id: "4", name: "Dave", avatar: mockUsers[3].avatar },
          { id: "5", name: "Alex", avatar: mockUsers[4].avatar },
        ],
        savedPlaces: 5
      },
      {
        id: "3",
        name: "Bali Getaway",
        destination: "Bali, Indonesia",
        description: "Beach relaxation and cultural exploration",
        startDate: "2025-12-10",
        endDate: "2025-12-20",
        collaborators: [
          { id: "1", name: mockUsers[0].name, avatar: mockUsers[0].avatar },
          { id: "6", name: "Emma", avatar: mockUsers[5].avatar },
          { id: "7", name: "Mike", avatar: mockUsers[6].avatar },
        ],
        savedPlaces: 6
      }
    ];
  };

  const createTrip = (tripData: {
    name: string;
    destination: string;
    description: string;
    dateRange: DateRange;
  }) => {
    if (!tripData.name || !tripData.destination || !tripData.dateRange?.from || !tripData.dateRange?.to) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    const newTrip: Trip = {
      id: Date.now().toString(),
      name: tripData.name,
      destination: tripData.destination,
      description: tripData.description,
      startDate: tripData.dateRange.from.toISOString().split('T')[0],
      endDate: tripData.dateRange.to.toISOString().split('T')[0],
      collaborators: [
        { id: "1", name: mockUsers[0].name, avatar: mockUsers[0].avatar },
      ],
      savedPlaces: 0
    };
    
    const updatedTrips = [...trips, newTrip];
    setTrips(updatedTrips);
    
    // Save to localStorage
    localStorage.setItem('trips', JSON.stringify(updatedTrips));
    toast.success("Trip created successfully!");
  };

  const deleteTrip = (tripId: string) => {
    const updatedTrips = trips.filter(trip => trip.id !== tripId);
    setTrips(updatedTrips);
    
    // Save to localStorage
    localStorage.setItem('trips', JSON.stringify(updatedTrips));
    toast.success("Trip deleted successfully");
  };

  const inviteUserToTrip = (tripId: string, email: string) => {
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }
    
    // Find the trip
    const trip = trips.find(t => t.id === tripId);
    if (trip) {
      // In a real app, this would send an email invitation
      // For now, we'll just simulate adding a user
      const updatedTrips = trips.map(t => {
        if (t.id === tripId) {
          // Add a mock user
          const newCollaborator = {
            id: (t.collaborators.length + 1).toString(),
            name: `Invited User ${t.collaborators.length + 1}`,
            avatar: mockUsers[Math.floor(Math.random() * mockUsers.length)].avatar
          };
          
          return {
            ...t,
            collaborators: [...t.collaborators, newCollaborator]
          };
        }
        return t;
      });
      
      setTrips(updatedTrips);
      localStorage.setItem('trips', JSON.stringify(updatedTrips));
    }
    
    toast.success(`Invitation sent to ${email}`);
  };

  return {
    trips,
    createTrip,
    deleteTrip,
    inviteUserToTrip
  };
};
