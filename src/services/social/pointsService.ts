import { table, withFallback } from "@/services/data";

export interface PointsLedgerEntry {
  id: string;
  points: number;
  reason: string;
  createdAt: string;
}

/** Demo fallback ledger shown when signed out or the ledger is empty. */
const mockLedger: PointsLedgerEntry[] = [
  { id: "m1", points: 25, reason: "Checked in at Griffith Observatory", createdAt: "2025-04-04T12:00:00Z" },
  { id: "m2", points: 75, reason: "Posted a video at Crypto.com Arena", createdAt: "2025-04-02T12:00:00Z" },
  { id: "m3", points: 50, reason: "5-day streak bonus", createdAt: "2025-04-01T12:00:00Z" },
  { id: "m4", points: 30, reason: "Verified Venice Beach review", createdAt: "2025-03-28T12:00:00Z" },
  { id: "m5", points: 45, reason: "Shared 3 locations", createdAt: "2025-03-25T12:00:00Z" },
];

const MOCK_TOTAL = 1250;

export const pointsService = {
  /** Total points for a user (profiles.points), falling back to a demo total. */
  async getTotal(userId?: string): Promise<number> {
    if (!userId) return MOCK_TOTAL;
    return withFallback<number>(
      "points.getTotal",
      async () => {
        const { data, error } = await table("profiles")
          .select("points")
          .eq("id", userId)
          .maybeSingle();
        return { data: data ? (data.points as number) : null, error };
      },
      () => MOCK_TOTAL,
      false,
    );
  },

  /** Recent points ledger entries for a user, falling back to demo activity. */
  async getLedger(userId?: string, limit = 20): Promise<PointsLedgerEntry[]> {
    if (!userId) return mockLedger;
    return withFallback<PointsLedgerEntry[]>(
      "points.getLedger",
      async () => {
        const { data, error } = await table("points_ledger")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(limit);
        const rows = (data ?? []).map((r: any) => ({
          id: r.id,
          points: r.points,
          reason: r.reason ?? "Points activity",
          createdAt: r.created_at,
        }));
        return { data: rows, error };
      },
      () => mockLedger,
    );
  },
};

export default pointsService;
