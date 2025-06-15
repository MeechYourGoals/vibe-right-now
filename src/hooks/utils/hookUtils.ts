
// Common hook utilities and patterns
import { useCallback, useEffect, useRef, useState } from 'react';

// Generic state management hook
export const useAsyncState = <T>(initialState: T) => {
  const [state, setState] = useState<T>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateState = useCallback(async (updater: () => Promise<T> | T) => {
    setLoading(true);
    setError(null);
    try {
      const result = await updater();
      setState(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  return { state, loading, error, updateState, setState, setError };
};

// Debounced value hook
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Previous value hook
export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

// Cleanup effect hook
export const useCleanupEffect = (effect: () => (() => void) | void, deps: any[]) => {
  useEffect(() => {
    const cleanup = effect();
    return cleanup;
  }, deps);
};
