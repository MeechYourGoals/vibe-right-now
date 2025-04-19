
import { useState, useCallback } from 'react';
import { SearchResult, ExtractedIntent } from '../types';

const mockPlaces: SearchResult[] = [
  {
    id: 'place1',
    name: 'The Coffee Shop',
    description: 'Trendy coffee shop with artisanal brews',
    address: '123 Main St, Anytown, USA',
    type: 'cafe',
    distance: '0.2 miles',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    price: '$$',
    category: 'cafe'
  },
  {
    id: 'place2',
    name: 'Urban Restaurant',
    description: 'Modern American cuisine in a sophisticated setting',
    address: '456 Oak Ave, Anytown, USA',
    type: 'restaurant',
    distance: '0.5 miles',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    price: '$$$',
    category: 'restaurant'
  },
  {
    id: 'place3',
    name: 'Nightlife Lounge',
    description: 'Popular nightclub with craft cocktails and DJ music',
    address: '789 Broadway, Anytown, USA',
    type: 'nightlife',
    distance: '1.2 miles',
    rating: 4.3,
    imageUrl: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    price: '$$$',
    category: 'nightlife'
  }
];

export const useGooglePlacesService = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const searchPlaces = useCallback(async (
    query: string,
    intent?: ExtractedIntent,
    options?: { 
      latitude?: number; 
      longitude?: number; 
      radius?: number;
      type?: string;
    }
  ) => {
    setLoading(true);
    setError(null);

    try {
      // This is where we would normally make an API call to the Google Places API
      // For now, we're just simulating a response with mock data
      
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      // Filter mock results based on query
      let filtered = [...mockPlaces];
      
      if (query) {
        const lowerQuery = query.toLowerCase();
        filtered = filtered.filter(place => 
          place.name.toLowerCase().includes(lowerQuery) ||
          place.description?.toLowerCase().includes(lowerQuery) ||
          place.type?.toLowerCase().includes(lowerQuery) ||
          place.category?.toLowerCase().includes(lowerQuery)
        );
      }
      
      // Filter by type if provided
      if (options?.type) {
        filtered = filtered.filter(place => 
          place.type?.toLowerCase() === options.type?.toLowerCase()
        );
      }
      
      // Use intent to enhance search
      if (intent) {
        // If we have mood keywords, prioritize places that match the mood
        if (intent.mood && intent.mood.length > 0) {
          filtered.sort((a, b) => {
            const aDesc = a.description?.toLowerCase() || '';
            const bDesc = b.description?.toLowerCase() || '';
            
            const aMatchCount = intent.mood?.filter(mood => 
              aDesc.includes(mood.toLowerCase())
            ).length || 0;
            
            const bMatchCount = intent.mood?.filter(mood => 
              bDesc.includes(mood.toLowerCase())
            ).length || 0;
            
            return bMatchCount - aMatchCount;
          });
        }
      }
      
      setResults(filtered);
    } catch (err) {
      console.error('Error searching places:', err);
      setError('Failed to search places. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    searchPlaces,
    results,
    loading,
    error,
    clearResults: () => setResults([])
  };
};
