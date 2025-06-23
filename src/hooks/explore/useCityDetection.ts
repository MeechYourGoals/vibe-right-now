
import { useEffect } from "react";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const useCityDetection = (
  setSearchQuery: (query: string) => void,
  setSearchedCity: (city: string) => void,
  setSearchedState: (state: string) => void,
  handleSearch: (query: string, filterType: string, category: string) => void
) => {
  useEffect(() => {
    // Detect user city if query is empty
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${GOOGLE_MAPS_API_KEY}`
            );
            
            if (!response.ok) return;
            
            const data = await response.json();
            
            if (!data.results || data.results.length === 0) return;
            
            // Try to find city component
            const addressComponents = data.results[0].address_components;
            const cityComponent = addressComponents.find(
              (component: any) => 
                component.types.includes('locality') || 
                component.types.includes('administrative_area_level_1')
            );
            
            const stateComponent = addressComponents.find(
              (component: any) => component.types.includes('administrative_area_level_1')
            );
            
            if (cityComponent) {
              const detectedCity = cityComponent.long_name;
              const detectedState = stateComponent ? stateComponent.short_name : "";
              
              // Only set location if we're not already searching
              setSearchedCity(detectedCity);
              setSearchedState(detectedState);
              
              // Use handleSearch to update locations for the detected city
              handleSearch(`${detectedCity}${detectedState ? `, ${detectedState}` : ""}`, "All", "places");
            }
          } catch (error) {
            console.error("Error detecting location:", error);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  }, []);
  
  return {};
};
