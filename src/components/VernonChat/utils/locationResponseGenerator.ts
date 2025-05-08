
import { Location } from "@/types";
import { formatSearchResponse } from "../../../utils/responseFormatter";
import { mockLocations } from "@/mock/data";

/**
 * Generate responses about locations
 */
export class LocationResponseGenerator {
  /**
   * Generate a response about nearby locations
   */
  static generateNearbyResponse(
    latitude: number,
    longitude: number,
    category?: string,
    maxResults = 5
  ) {
    try {
      // Filter mock locations to simulate nearby locations
      const nearbyLocations = this.filterNearbyLocations(
        latitude,
        longitude,
        category,
        maxResults
      );
      
      return formatSearchResponse(nearbyLocations);
    } catch (error) {
      console.error("Error generating nearby response:", error);
      return {
        results: [],
        message: "I couldn't find any places nearby."
      };
    }
  }

  /**
   * Generate a response about a specific location
   */
  static generateLocationDetailResponse(locationId: string) {
    try {
      const location = mockLocations.find(loc => loc.id === locationId);
      
      if (!location) {
        return {
          result: null,
          message: "I couldn't find information about that location."
        };
      }
      
      return {
        result: location,
        message: `Here's information about ${location.name}.`
      };
    } catch (error) {
      console.error("Error generating location detail response:", error);
      return {
        result: null,
        message: "I couldn't find information about that location."
      };
    }
  }

  /**
   * Filter mock locations to simulate nearby locations
   */
  private static filterNearbyLocations(
    latitude: number,
    longitude: number,
    category?: string,
    maxResults = 5
  ): Location[] {
    // Calculate rough distance (this is a simplified approach)
    const locationsWithDistances = mockLocations.map(location => {
      const distance = this.calculateDistance(
        latitude,
        longitude,
        location.lat,
        location.lng
      );
      
      return { ...location, distance };
    });
    
    // Filter by category if specified
    let filteredLocations = locationsWithDistances;
    if (category) {
      filteredLocations = filteredLocations.filter(
        loc => loc.type.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Sort by distance and limit results
    return filteredLocations
      .sort((a, b) => a.distance - b.distance)
      .slice(0, maxResults);
  }

  /**
   * Calculate distance between two points using the Haversine formula
   */
  private static calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    
    return distance;
  }

  /**
   * Convert degrees to radians
   */
  private static deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}
