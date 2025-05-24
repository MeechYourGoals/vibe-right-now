
import { useState } from 'react';
import { Location } from '@/types';

export const useExploreState = () => {
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [locationTags, setLocationTags] = useState<Record<string, string[]>>({});
  const [eventVenues, setEventVenues] = useState<Location[]>([]);
  const [foodVenues, setFoodVenues] = useState<Location[]>([]);
  const [drinkVenues, setDrinkVenues] = useState<Location[]>([]);
  const [sportsVenues, setSportsVenues] = useState<Location[]>([]);
  const [nightlifeVenues, setNightlifeVenues] = useState<Location[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [detectedCity, setDetectedCity] = useState('');
  
  const handleCategoryChange = (category: string) => console.log('Category changed:', category);
  const handleVibeChange = (vibe: string) => console.log('Vibe changed:', vibe);
  const handleDateChange = (date: string) => console.log('Date changed:', date);
  
  return {
    filteredLocations,
    setFilteredLocations,
    locationTags,
    setLocationTags,
    eventVenues,
    setEventVenues,
    foodVenues,
    setFoodVenues,
    drinkVenues,
    setDrinkVenues,
    sportsVenues,
    setSportsVenues,
    nightlifeVenues,
    setNightlifeVenues,
    locations,
    loading,
    setLocations,
    setLoading,
    detectedCity,
    setDetectedCity,
    handleCategoryChange,
    handleVibeChange,
    handleDateChange
  };
};
