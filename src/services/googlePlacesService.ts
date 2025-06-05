
import { GooglePlace, PlaceSearchRequest, Location } from "@/types";

const GOOGLE_PLACES_API_KEY = "AIzaSyAWm0vayRrQJHpMc6XcShcge52hGTt9BV4";
const PLACES_API_BASE_URL = "https://maps.googleapis.com/maps/api/place";

export class GooglePlacesService {
  private static instance: GooglePlacesService;
  
  static getInstance(): GooglePlacesService {
    if (!GooglePlacesService.instance) {
      GooglePlacesService.instance = new GooglePlacesService();
    }
    return GooglePlacesService.instance;
  }

  async searchPlaces(request: PlaceSearchRequest): Promise<GooglePlace[]> {
    try {
      const { query, location, radius = 5000, type } = request;
      
      let url = `${PLACES_API_BASE_URL}/textsearch/json?query=${encodeURIComponent(query)}&key=${GOOGLE_PLACES_API_KEY}`;
      
      if (location) {
        url += `&location=${location.lat},${location.lng}&radius=${radius}`;
      }
      
      if (type) {
        url += `&type=${type}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      
      if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
        throw new Error(`Places API error: ${data.status}`);
      }
      
      return data.results || [];
    } catch (error) {
      console.error('Error searching places:', error);
      return [];
    }
  }

  async getNearbyPlaces(location: { lat: number; lng: number }, radius: number = 5000, type?: string): Promise<GooglePlace[]> {
    try {
      let url = `${PLACES_API_BASE_URL}/nearbysearch/json?location=${location.lat},${location.lng}&radius=${radius}&key=${GOOGLE_PLACES_API_KEY}`;
      
      if (type) {
        url += `&type=${type}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      
      if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
        throw new Error(`Places API error: ${data.status}`);
      }
      
      return data.results || [];
    } catch (error) {
      console.error('Error getting nearby places:', error);
      return [];
    }
  }

  async getPlaceDetails(placeId: string): Promise<GooglePlace | null> {
    try {
      const url = `${PLACES_API_BASE_URL}/details/json?place_id=${placeId}&fields=name,formatted_address,geometry,rating,price_level,photos,types,opening_hours,website,formatted_phone_number&key=${GOOGLE_PLACES_API_KEY}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.status !== 'OK') {
        throw new Error(`Place details API error: ${data.status}`);
      }
      
      return data.result;
    } catch (error) {
      console.error('Error getting place details:', error);
      return null;
    }
  }

  async getPlaceAutocomplete(input: string, location?: { lat: number; lng: number }): Promise<any[]> {
    try {
      let url = `${PLACES_API_BASE_URL}/autocomplete/json?input=${encodeURIComponent(input)}&key=${GOOGLE_PLACES_API_KEY}`;
      
      if (location) {
        url += `&location=${location.lat},${location.lng}&radius=50000`;
      }

      const response = await fetch(url);
      const data = await response.json();
      
      if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
        throw new Error(`Autocomplete API error: ${data.status}`);
      }
      
      return data.predictions || [];
    } catch (error) {
      console.error('Error getting autocomplete suggestions:', error);
      return [];
    }
  }

  convertGooglePlaceToLocation(googlePlace: GooglePlace): Location {
    const typeMap: Record<string, Location['type']> = {
      'restaurant': 'restaurant',
      'bar': 'bar',
      'night_club': 'bar',
      'stadium': 'sports',
      'gym': 'sports',
      'tourist_attraction': 'attraction',
      'amusement_park': 'attraction',
      'museum': 'attraction',
      'art_gallery': 'attraction',
      'store': 'other',
      'shopping_mall': 'other'
    };

    const locationType = googlePlace.types.find(type => typeMap[type]) || 'other';
    const mappedType = typeMap[locationType] || 'other';

    return {
      id: googlePlace.place_id,
      name: googlePlace.name,
      lat: googlePlace.geometry.location.lat,
      lng: googlePlace.geometry.location.lng,
      city: this.extractCityFromAddress(googlePlace.formatted_address),
      type: mappedType,
      address: googlePlace.formatted_address,
      rating: googlePlace.rating,
      priceLevel: googlePlace.price_level,
      placeId: googlePlace.place_id,
      googleMapsUrl: `https://maps.google.com/maps?place_id=${googlePlace.place_id}`,
      website: googlePlace.website,
      phoneNumber: googlePlace.formatted_phone_number,
      photos: googlePlace.photos?.map(photo => 
        `${PLACES_API_BASE_URL}/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${GOOGLE_PLACES_API_KEY}`
      ) || []
    };
  }

  private extractCityFromAddress(address: string): string {
    const parts = address.split(',');
    if (parts.length >= 2) {
      return parts[parts.length - 3]?.trim() || parts[0].trim();
    }
    return parts[0].trim();
  }

  getPhotoUrl(photoReference: string, maxWidth: number = 400): string {
    return `${PLACES_API_BASE_URL}/photo?maxwidth=${maxWidth}&photoreference=${photoReference}&key=${GOOGLE_PLACES_API_KEY}`;
  }
}

export const googlePlacesService = GooglePlacesService.getInstance();
