import type { Location } from "@/types";
import { mockLocations } from "@/mock/locations";
import { table, withFallback } from "./config";
import { invokeEdgeWithFallback } from "@/services/edge/invokeEdge";

/** Map a `locations` DB row to the app's Location type. */
export function mapRowToLocation(row: any): Location {
  return {
    id: row.id,
    name: row.name,
    address: row.address ?? "",
    city: row.city ?? "",
    state: row.state ?? undefined,
    country: row.country ?? undefined,
    lat: row.lat,
    lng: row.lng,
    type: row.category ?? "venue",
    verified: false,
  } as Location;
}

export const locationsRepo = {
  async getById(id: string): Promise<Location | null> {
    return withFallback<Location | null>(
      "locations.getById",
      async () => {
        const { data, error } = await table("locations").select("*").eq("id", id).maybeSingle();
        return { data: data ? mapRowToLocation(data) : null, error };
      },
      () => mockLocations.find((l) => l.id === id) ?? null,
      false,
    );
  },

  /**
   * Text search. Tries the google-places edge function first (real venue data), then the
   * locations table, and finally a local filter over mock venues — so search always
   * returns something even with no API keys configured.
   */
  async search(query: string, limit = 20): Promise<Location[]> {
    const q = query.trim().toLowerCase();
    return invokeEdgeWithFallback<Location[]>(
      "google-places",
      { action: "textSearch", query },
      async () =>
        withFallback<Location[]>(
          "locations.search",
          async () => {
            const { data, error } = await table("locations")
              .select("*")
              .ilike("name", `%${query}%`)
              .limit(limit);
            return { data: (data ?? []).map(mapRowToLocation), error };
          },
          () =>
            mockLocations
              .filter(
                (l) =>
                  l.name.toLowerCase().includes(q) ||
                  l.city?.toLowerCase().includes(q) ||
                  l.tags?.some((t) => t.toLowerCase().includes(q)),
              )
              .slice(0, limit),
        ),
    );
  },

  async nearby(_lat: number, _lng: number, limit = 20): Promise<Location[]> {
    return withFallback<Location[]>(
      "locations.nearby",
      async () => {
        const { data, error } = await table("locations").select("*").limit(limit);
        return { data: (data ?? []).map(mapRowToLocation), error };
      },
      () => mockLocations.slice(0, limit),
    );
  },

  async byCity(city: string, limit = 30): Promise<Location[]> {
    const c = city.trim().toLowerCase();
    return withFallback<Location[]>(
      "locations.byCity",
      async () => {
        const { data, error } = await table("locations")
          .select("*")
          .ilike("city", `%${city}%`)
          .limit(limit);
        return { data: (data ?? []).map(mapRowToLocation), error };
      },
      () => mockLocations.filter((l) => l.city?.toLowerCase().includes(c)).slice(0, limit),
    );
  },
};
