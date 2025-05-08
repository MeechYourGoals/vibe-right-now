
import { Location } from '@/types';
import { mockLocations } from '@/mock/data';

type LocationStats = {
  totalPosts: number;
  totalPhotos: number;
  avgRating: number;
  totalReviews: number;
  popularTimes: Record<string, number[]>;
};

class VenueService {
  /**
   * Get a venue by ID
   */
  async getVenueById(id: string): Promise<Location | null> {
    // In a real app, this would be an API call
    const venue = mockLocations.find(loc => loc.id === id);
    return venue || null;
  }

  /**
   * Get statistics for a venue
   */
  async getVenueStats(id: string): Promise<LocationStats | null> {
    // In a real app, this would be an API call
    const venue = mockLocations.find(loc => loc.id === id);
    
    if (!venue) {
      return null;
    }
    
    // Generate mock statistics
    return {
      totalPosts: Math.floor(Math.random() * 100) + 10,
      totalPhotos: Math.floor(Math.random() * 200) + 20,
      avgRating: (Math.random() * 2) + 3,  // Between 3 and 5
      totalReviews: Math.floor(Math.random() * 1000) + 50,
      popularTimes: this.generateMockPopularTimes()
    };
  }

  /**
   * Generate mock popular times data
   */
  private generateMockPopularTimes(): Record<string, number[]> {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const result: Record<string, number[]> = {};
    
    days.forEach(day => {
      const hours = [];
      
      // Generate 24 hours of data (0-23)
      for (let i = 0; i < 24; i++) {
        let value = 0;
        
        if (i >= 7 && i <= 23) { // Open hours
          if (day === 'friday' || day === 'saturday') {
            // Weekend pattern
            if (i >= 11 && i <= 14) { // Lunch rush
              value = 60 + Math.floor(Math.random() * 40); // 60-100
            } else if (i >= 18 && i <= 21) { // Dinner rush
              value = 70 + Math.floor(Math.random() * 30); // 70-100
            } else {
              value = 20 + Math.floor(Math.random() * 40); // 20-60
            }
          } else {
            // Weekday pattern
            if (i >= 11 && i <= 13) { // Lunch rush
              value = 50 + Math.floor(Math.random() * 40); // 50-90
            } else if (i >= 17 && i <= 19) { // Dinner rush
              value = 60 + Math.floor(Math.random() * 30); // 60-90
            } else {
              value = 10 + Math.floor(Math.random() * 30); // 10-40
            }
          }
        } else {
          // Closed or very low traffic hours
          value = Math.floor(Math.random() * 10); // 0-9
        }
        
        hours.push(value);
      }
      
      result[day] = hours;
    });
    
    return result;
  }

  /**
   * Get nearby venues
   */
  async getNearbyVenues(venueId: string, radius: number = 5): Promise<Location[]> {
    // In a real app, this would be an API call with geospatial queries
    const venue = mockLocations.find(loc => loc.id === venueId);
    
    if (!venue) {
      return [];
    }
    
    // Filter locations within approximate radius (simplified approach)
    const nearby = mockLocations.filter(loc => {
      if (loc.id === venueId) return false; // Exclude the current venue
      
      // Simple distance calculation (not accurate for large distances)
      const latDiff = Math.abs(loc.lat - venue.lat);
      const lngDiff = Math.abs(loc.lng - venue.lng);
      
      // Rough approximation: 0.01 degrees is about 0.7 miles
      const distanceDegrees = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
      const distanceMiles = distanceDegrees * 70;
      
      return distanceMiles <= radius;
    });
    
    return nearby.slice(0, 5); // Return up to 5 nearby venues
  }
}

export default new VenueService();
