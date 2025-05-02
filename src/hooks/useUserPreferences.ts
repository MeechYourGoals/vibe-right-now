
import { useState, useEffect } from 'react';

export interface UserPreferences {
  vibes: string[];
  categories: string[];
  interests: string[];
}

const DEFAULT_PREFERENCES: UserPreferences = {
  vibes: ['Trendy', 'Cozy'],
  categories: ['Restaurant', 'Bar'],
  interests: ['Sports', 'Music']
};

/**
 * Hook to get and update user preferences
 */
export const useUserPreferences = () => {
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [isLoading, setIsLoading] = useState(true);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const loadPreferences = () => {
      try {
        const savedPrefs = localStorage.getItem('userPreferences');
        if (savedPrefs) {
          setPreferences(JSON.parse(savedPrefs));
        }
      } catch (error) {
        console.error('Error loading preferences:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPreferences();
  }, []);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('userPreferences', JSON.stringify(preferences));
    }
  }, [preferences, isLoading]);

  /**
   * Update a specific preference category
   */
  const updatePreference = (
    category: keyof UserPreferences,
    values: string[]
  ) => {
    setPreferences(prev => ({
      ...prev,
      [category]: values
    }));
  };

  /**
   * Add a single preference value to a category
   */
  const addPreference = (category: keyof UserPreferences, value: string) => {
    setPreferences(prev => {
      if (prev[category].includes(value)) {
        return prev; // Already exists
      }
      return {
        ...prev,
        [category]: [...prev[category], value]
      };
    });
  };

  /**
   * Remove a single preference value from a category
   */
  const removePreference = (category: keyof UserPreferences, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [category]: prev[category].filter(item => item !== value)
    }));
  };

  /**
   * Get all preferences as a flat array of strings
   */
  const getAllPreferencesFlat = (): string[] => {
    return [
      ...preferences.vibes,
      ...preferences.categories,
      ...preferences.interests
    ];
  };

  return {
    preferences,
    isLoading,
    updatePreference,
    addPreference,
    removePreference,
    getAllPreferencesFlat
  };
};
