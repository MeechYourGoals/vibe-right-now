import { Location } from "@/types";
import { generateRestaurants, generateCafes } from "@/utils/explore/generators/restaurantGenerator";
import { generateBars, generateNightlife } from "@/utils/explore/generators/barGenerator";
import { generateAttractions, generateLandmarks } from "@/utils/explore/generators/attractionsGenerator";
import { generateSportsVenues } from "@/utils/explore/generators/sportsGenerator";

// Function to generate locations for a specific city
export const generateCityLocations = (city: string, state: string): Location[] => {
  const restaurants = generateRestaurants(city, state, 4);
  const cafes = generateCafes(city, state, 2);
  const bars = generateBars(city, state, 3);
  const nightlife = generateNightlife(city, state, 2);
  const attractions = generateAttractions(city, state, 2);
  const landmarks = generateLandmarks(city, state, 1);
  const sportsVenues = generateSportsVenues(city, state, 1);

  return [
    ...restaurants,
    ...cafes,
    ...bars,
    ...nightlife,
    ...attractions,
    ...landmarks,
    ...sportsVenues
  ];
};

// Function to generate locations for all cities
export const generateAllCityLocations = (): Location[] => {
  const losAngelesLocations = generateCityLocations("Los Angeles", "CA");
  const newYorkLocations = generateCityLocations("New York", "NY");
  const sanFranciscoLocations = generateCityLocations("San Francisco", "CA");
  const chicagoLocations = generateCityLocations("Chicago", "IL");
  const miamiLocations = generateCityLocations("Miami", "FL");
  const austinLocations = generateCityLocations("Austin", "TX");
  const bostonLocations = generateCityLocations("Boston", "MA");
  const seattleLocations = generateCityLocations("Seattle", "WA");
  const denverLocations = generateCityLocations("Denver", "CO");
  const philadelphiaLocations = generateCityLocations("Philadelphia", "PA");
  const atlantaLocations = generateCityLocations("Atlanta", "GA");
  const dallasLocations = generateCityLocations("Dallas", "TX");
  const houstonLocations = generateCityLocations("Houston", "TX");
  const washingtonDCLocations = generateCityLocations("Washington DC", "DC");
  const lasVegasLocations = generateCityLocations("Las Vegas", "NV");
  const sanDiegoLocations = generateCityLocations("San Diego", "CA");
  const orlandoLocations = generateCityLocations("Orlando", "FL");
  const sanAntonioLocations = generateCityLocations("San Antonio", "TX");
  const portlandLocations = generateCityLocations("Portland", "OR");
  const sacramentoLocations = generateCityLocations("Sacramento", "CA");

  return [
    ...losAngelesLocations,
    ...newYorkLocations,
    ...sanFranciscoLocations,
    ...chicagoLocations,
    ...miamiLocations,
    ...austinLocations,
    ...bostonLocations,
    ...seattleLocations,
    ...denverLocations,
    ...philadelphiaLocations,
    ...atlantaLocations,
    ...dallasLocations,
    ...houstonLocations,
    ...washingtonDCLocations,
    ...lasVegasLocations,
    ...sanDiegoLocations,
    ...orlandoLocations,
    ...sanAntonioLocations,
    ...portlandLocations,
    ...sacramentoLocations
  ];
};
