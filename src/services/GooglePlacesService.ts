
// Google Places API Service
export class GooglePlacesService {
  private static readonly API_KEY = 'AIzaSyAWm0vayRrQJHpMc6XcShcge52hGTt9BV4';
  private static readonly BASE_URL = 'https://maps.googleapis.com/maps/api/place';

  // Search for places near a location
  static async searchNearby(
    location: { lat: number; lng: number },
    radius: number = 5000,
    type?: string
  ): Promise<any[]> {
    try {
      const params = new URLSearchParams({
        location: `${location.lat},${location.lng}`,
        radius: radius.toString(),
        key: this.API_KEY,
        ...(type && { type })
      });

      const response = await fetch(`${this.BASE_URL}/nearbysearch/json?${params}`);
      const data = await response.json();
      
      if (data.status === 'OK') {
        return data.results || [];
      } else {
        console.error('Google Places API error:', data.status, data.error_message);
        return [];
      }
    } catch (error) {
      console.error('Error fetching nearby places:', error);
      return [];
    }
  }

  // Search for places by text query
  static async textSearch(query: string, location?: { lat: number; lng: number }): Promise<any[]> {
    try {
      const params = new URLSearchParams({
        query,
        key: this.API_KEY,
        ...(location && { location: `${location.lat},${location.lng}`, radius: '50000' })
      });

      const response = await fetch(`${this.BASE_URL}/textsearch/json?${params}`);
      const data = await response.json();
      
      if (data.status === 'OK') {
        return data.results || [];
      } else {
        console.error('Google Places API error:', data.status, data.error_message);
        return [];
      }
    } catch (error) {
      console.error('Error searching places:', error);
      return [];
    }
  }

  // Get place details
  static async getPlaceDetails(placeId: string): Promise<any | null> {
    try {
      const params = new URLSearchParams({
        place_id: placeId,
        fields: 'name,formatted_address,geometry,photos,rating,user_ratings_total,opening_hours,website,formatted_phone_number,types,price_level',
        key: this.API_KEY
      });

      const response = await fetch(`${this.BASE_URL}/details/json?${params}`);
      const data = await response.json();
      
      if (data.status === 'OK') {
        return data.result;
      } else {
        console.error('Google Places API error:', data.status, data.error_message);
        return null;
      }
    } catch (error) {
      console.error('Error fetching place details:', error);
      return null;
    }
  }

  // Convert Google Places result to our Location format
  static convertToLocation(place: any, index: number): any {
    const types = place.types || [];
    let locationType = 'other';
    
    if (types.includes('restaurant') || types.includes('food')) locationType = 'restaurant';
    else if (types.includes('bar') || types.includes('night_club')) locationType = 'bar';
    else if (types.includes('tourist_attraction')) locationType = 'attraction';
    else if (types.includes('stadium') || types.includes('gym')) locationType = 'sports';
    
    return {
      id: `google-${place.place_id}`,
      name: place.name,
      city: place.vicinity || 'Unknown',
      state: 'Unknown', // Google doesn't always provide state in nearby search
      country: 'US',
      type: locationType,
      lat: place.geometry?.location?.lat || 0,
      lng: place.geometry?.location?.lng || 0,
      rating: place.rating || 0,
      reviews: place.user_ratings_total || 0,
      priceLevel: place.price_level || 1,
      hours: place.opening_hours?.open_now ? 'Open' : 'Closed',
      verified: true,
      photos: place.photos?.slice(0, 3).map((photo: any) => 
        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photo.photo_reference}&key=${this.API_KEY}`
      ) || []
    };
  }
}
