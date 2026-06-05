import { table, withFallback } from "./config";

export interface TripRecord {
  id: string;
  ownerId: string;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  coverImageUrl?: string;
  createdAt?: string;
}

function mapRowToTrip(row: any): TripRecord {
  return {
    id: row.id,
    ownerId: row.owner_id,
    name: row.name,
    description: row.description ?? undefined,
    startDate: row.start_date ?? undefined,
    endDate: row.end_date ?? undefined,
    coverImageUrl: row.cover_image_url ?? undefined,
    createdAt: row.created_at,
  };
}

const mockTrips: TripRecord[] = [
  { id: "demo-trip-1", ownerId: "1", name: "Weekend in Miami", description: "Beach + nightlife" },
  { id: "demo-trip-2", ownerId: "1", name: "NYC Food Crawl", description: "Best eats in the city" },
];

export const tripsRepo = {
  async listForUser(userId: string): Promise<TripRecord[]> {
    return withFallback<TripRecord[]>(
      "trips.listForUser",
      async () => {
        const { data, error } = await table("trips")
          .select("*")
          .or(`owner_id.eq.${userId}`)
          .order("created_at", { ascending: false });
        return { data: (data ?? []).map(mapRowToTrip), error };
      },
      () => mockTrips,
    );
  },

  async getById(id: string): Promise<TripRecord | null> {
    return withFallback<TripRecord | null>(
      "trips.getById",
      async () => {
        const { data, error } = await table("trips").select("*").eq("id", id).maybeSingle();
        return { data: data ? mapRowToTrip(data) : null, error };
      },
      () => mockTrips.find((t) => t.id === id) ?? mockTrips[0],
      false,
    );
  },

  async create(input: {
    ownerId: string;
    name: string;
    description?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<TripRecord> {
    const { data, error } = await table("trips")
      .insert({
        owner_id: input.ownerId,
        name: input.name,
        description: input.description ?? null,
        start_date: input.startDate ?? null,
        end_date: input.endDate ?? null,
      })
      .select("*")
      .single();
    if (error) throw error;
    // Owner is also a member.
    await table("trip_members").insert({
      trip_id: data.id,
      user_id: input.ownerId,
      role: "owner",
    });
    return mapRowToTrip(data);
  },

  async addMember(tripId: string, userId: string): Promise<void> {
    const { error } = await table("trip_members").insert({
      trip_id: tripId,
      user_id: userId,
      role: "member",
    });
    if (error && error.code !== "23505") throw error;
  },

  async remove(id: string): Promise<void> {
    const { error } = await table("trips").delete().eq("id", id);
    if (error) throw error;
  },
};
