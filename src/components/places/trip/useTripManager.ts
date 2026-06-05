
import { useState, useEffect, useCallback } from 'react';
import { mockUsers } from "@/mock/data";
import { DateRange } from 'react-day-picker';
import { toast } from "sonner";
import { tripsRepo, USE_MOCK_FALLBACK } from "@/services/data";
import { getCurrentUserId } from "@/services/trips/tripCollabService";

interface Trip {
  id: string;
  name: string;
  destination: string;
  description: string;
  startDate: string;
  endDate: string;
  collaborators: {
    id: string;
    name: string;
    avatar: string;
  }[];
  savedPlaces: number;
}

interface UseTripManagerReturn {
  trips: Trip[];
  isLoading: boolean;
  createTrip: (tripData: {
    name: string;
    destination: string;
    description: string;
    dateRange: DateRange;
  }) => void;
  deleteTrip: (tripId: string) => void;
  inviteUserToTrip: (tripId: string, email: string) => void;
}

const LOCAL_KEY = 'trips';
const today = new Date();
const fmt = (d: Date) => d.toISOString().split('T')[0];

/**
 * Local/mock trips used as an offline fallback when there is no signed-in user.
 * Kept in localStorage so demo edits survive a refresh while signed out.
 */
const getDefaultTrips = (): Trip[] => [
  {
    id: "1",
    name: "Summer in Paris",
    destination: "Paris, France",
    description: "Family vacation exploring the City of Light",
    startDate: fmt(new Date(today.getFullYear(), today.getMonth() + 1, 15)),
    endDate: fmt(new Date(today.getFullYear(), today.getMonth() + 1, 22)),
    collaborators: [
      { id: "1", name: mockUsers[0].name, avatar: mockUsers[0].avatar },
      { id: "2", name: "Mom", avatar: mockUsers[1].avatar },
      { id: "3", name: "Stacy", avatar: mockUsers[2].avatar },
    ],
    savedPlaces: 8,
  },
  {
    id: "2",
    name: "Tokyo Adventure",
    destination: "Tokyo, Japan",
    description: "Exploring Japanese culture and cuisine",
    startDate: fmt(new Date(today.getFullYear(), today.getMonth() + 4, 5)),
    endDate: fmt(new Date(today.getFullYear(), today.getMonth() + 4, 15)),
    collaborators: [
      { id: "1", name: mockUsers[0].name, avatar: mockUsers[0].avatar },
      { id: "4", name: "Dave", avatar: mockUsers[3].avatar },
      { id: "5", name: "Alex", avatar: mockUsers[4].avatar },
    ],
    savedPlaces: 5,
  },
];

function loadLocalTrips(): Trip[] {
  const stored = localStorage.getItem(LOCAL_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (err) {
      console.error('Error parsing stored trips:', err);
    }
  }
  const defaults = getDefaultTrips();
  localStorage.setItem(LOCAL_KEY, JSON.stringify(defaults));
  return defaults;
}

function saveLocalTrips(trips: Trip[]) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(trips));
}

/**
 * Maps a TripRecord from the data layer into the shape the trip UI expects.
 * `destination` is derived from the description (the trips table has no
 * dedicated destination column) and dates fall back to today so date-fns
 * parsing in TripCard never throws.
 */
function mapRecordToTrip(record: {
  id: string;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}, collaborators: Trip['collaborators']): Trip {
  return {
    id: record.id,
    name: record.name,
    destination: record.description || "Trip",
    description: record.description || "",
    startDate: record.startDate || fmt(today),
    endDate: record.endDate || fmt(today),
    collaborators: collaborators.length > 0
      ? collaborators
      : [{ id: "1", name: mockUsers[0].name, avatar: mockUsers[0].avatar }],
    savedPlaces: 0,
  };
}

export const useTripManager = (): UseTripManagerReturn => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadTrips = useCallback(async () => {
    setIsLoading(true);
    const uid = await getCurrentUserId();
    setUserId(uid);

    if (!uid) {
      // Signed out: local/mock fallback only.
      setTrips(loadLocalTrips());
      setIsLoading(false);
      return;
    }

    try {
      const records = await tripsRepo.listForUser(uid);
      setTrips(records.map((r) => mapRecordToTrip(r, [])));
    } catch (err) {
      console.warn('[useTripManager] falling back to local trips:', err);
      if (USE_MOCK_FALLBACK) {
        setTrips(loadLocalTrips());
      } else {
        toast.error('Failed to load trips');
        setTrips([]);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTrips();
  }, [loadTrips]);

  const createTrip = async (tripData: {
    name: string;
    destination: string;
    description: string;
    dateRange: DateRange;
  }) => {
    if (!tripData.name || !tripData.destination || !tripData.dateRange?.from || !tripData.dateRange?.to) {
      toast.error("Please fill in all required fields");
      return;
    }

    const startDate = fmt(tripData.dateRange.from);
    const endDate = fmt(tripData.dateRange.to);
    // Persist destination inside the description so it survives a reload.
    const description = tripData.description
      ? `${tripData.destination} — ${tripData.description}`
      : tripData.destination;

    if (!userId) {
      // Offline/local create.
      const newTrip: Trip = {
        id: Date.now().toString(),
        name: tripData.name,
        destination: tripData.destination,
        description: tripData.description,
        startDate,
        endDate,
        collaborators: [{ id: "1", name: mockUsers[0].name, avatar: mockUsers[0].avatar }],
        savedPlaces: 0,
      };
      const updated = [...trips, newTrip];
      setTrips(updated);
      saveLocalTrips(updated);
      toast.success("Trip created (offline). Sign in to sync.");
      return;
    }

    try {
      const record = await tripsRepo.create({
        ownerId: userId,
        name: tripData.name,
        description,
        startDate,
        endDate,
      });
      const newTrip = mapRecordToTrip(record, []);
      newTrip.destination = tripData.destination;
      setTrips((prev) => [newTrip, ...prev]);
      toast.success("Trip created successfully!");
    } catch (err) {
      console.error('[useTripManager] createTrip failed:', err);
      toast.error("Failed to create trip");
    }
  };

  const deleteTrip = async (tripId: string) => {
    if (!userId) {
      const updated = trips.filter((trip) => trip.id !== tripId);
      setTrips(updated);
      saveLocalTrips(updated);
      toast.success("Trip deleted");
      return;
    }

    try {
      await tripsRepo.remove(tripId);
      setTrips((prev) => prev.filter((trip) => trip.id !== tripId));
      toast.success("Trip deleted successfully");
    } catch (err) {
      console.error('[useTripManager] deleteTrip failed:', err);
      toast.error("Failed to delete trip");
    }
  };

  const inviteUserToTrip = async (tripId: string, email: string) => {
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }

    if (!userId) {
      toast.error("Please sign in to invite people to your trip");
      return;
    }

    try {
      // Look up the invitee's profile by email; persist a trip_members row when found.
      const { table } = await import("@/services/data");
      let inviteeId: string | null = null;
      try {
        const { data } = await table("profiles")
          .select("id")
          .eq("email", email)
          .maybeSingle();
        inviteeId = (data as any)?.id ?? null;
      } catch {
        inviteeId = null;
      }

      if (inviteeId) {
        await tripsRepo.addMember(tripId, inviteeId);
        toast.success(`Added ${email} to the trip`);
        loadTrips();
      } else {
        // Email-send itself is a demo stub.
        toast.success(`Invitation sent to ${email}`);
      }
    } catch (err) {
      console.error('[useTripManager] inviteUserToTrip failed:', err);
      toast.error("Failed to invite user");
    }
  };

  return {
    trips,
    isLoading,
    createTrip,
    deleteTrip,
    inviteUserToTrip,
  };
};
