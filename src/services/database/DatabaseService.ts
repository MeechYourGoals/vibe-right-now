
import { TripRepository } from './repositories/TripRepository';
import { SentimentRepository } from './repositories/SentimentRepository';
import { LocationRepository } from './repositories/LocationRepository';

export class DatabaseService {
  private static instance: DatabaseService;
  
  public readonly trips: TripRepository;
  public readonly sentiment: SentimentRepository;
  public readonly locations: LocationRepository;

  private constructor() {
    this.trips = new TripRepository();
    this.sentiment = new SentimentRepository();
    this.locations = new LocationRepository();
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }
}

// Export singleton instance
export const db = DatabaseService.getInstance();
