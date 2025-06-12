
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface PlaceAutocomplete {
  place_id: string;
  description: string;
  main_text: string;
  secondary_text: string;
  types: string[];
}

interface UseGooglePlacesAutocompleteProps {
  input: string;
  types?: string[];
  componentRestrictions?: {
    country?: string[];
  };
}

export const useGooglePlacesAutocomplete = ({
  input,
  types = ['(cities)'],
  componentRestrictions
}: UseGooglePlacesAutocompleteProps) => {
  const [predictions, setPredictions] = useState<PlaceAutocomplete[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController>();

  useEffect(() => {
    const fetchPredictions = async () => {
      if (!input || input.length < 2) {
        setPredictions([]);
        return;
      }

      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();
      setIsLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase.functions.invoke('google-places', {
          body: {
            input,
            types,
            componentRestrictions
          },
          signal: abortControllerRef.current.signal
        });

        if (error) throw error;

        if (data && data.predictions) {
          setPredictions(data.predictions);
        } else {
          setPredictions([]);
        }
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('Error fetching place predictions:', err);
          setError('Failed to fetch city suggestions');
          setPredictions([]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchPredictions, 300);
    return () => clearTimeout(timeoutId);
  }, [input, types, componentRestrictions]);

  return {
    predictions,
    isLoading,
    error
  };
};
