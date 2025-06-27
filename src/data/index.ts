// Centralized data exports for mock cities
export { default as barcelonaData } from "./mockCities/barcelona";
export { default as berlinData } from "./mockCities/berlin";
export { default as dubaiData } from "./mockCities/dubai";
export { default as istanbulData } from "./mockCities/istanbul";
export { default as laData } from "./mockCities/la";
export { default as melbourneData } from "./mockCities/melbourne";
export { default as moscowData } from "./mockCities/moscow";
export { default as mumbaiData } from "./mockCities/mumbai";
export { default as nycData } from "./mockCities/nyc";
export { default as phoenixData } from "./mockCities/phoenix";
export { default as rioData } from "./mockCities/riodejaneiro";
export { default as sanFranciscoData } from "./mockCities/sanfrancisco";
export { default as saoPauloData } from "./mockCities/saopaulo";
export { default as seoulData } from "./mockCities/seoul";
export { default as singaporeData } from "./mockCities/singapore";
export { default as sydneyData } from "./mockCities/sydney";
export { default as torontoData } from "./mockCities/toronto";
export { default as vegasData } from "./mockCities/vegas";
export { default as romeData } from "./mockCities/rome";

// Export a simplified array of available cities
export const availableCities = [
  "barcelona",
  "berlin",
  "dubai",
  "istanbul",
  "la",
  "melbourne",
  "moscow",
  "mumbai",
  "nyc",
  "phoenix",
  "riodejaneiro",
  "rome",
  "sanfrancisco",
  "saopaulo",
  "seoul",
  "singapore",
  "sydney",
  "toronto",
  "vegas",
];

import type { CityData } from "@/types";

// Consolidated city data map for quick lookups
export const CITY_DATA_MAP: Record<string, CityData> = {
  barcelona: require("./mockCities/barcelona").default,
  berlin: require("./mockCities/berlin").default,
  dubai: require("./mockCities/dubai").default,
  istanbul: require("./mockCities/istanbul").default,
  la: require("./mockCities/la").default,
  melbourne: require("./mockCities/melbourne").default,
  moscow: require("./mockCities/moscow").default,
  mumbai: require("./mockCities/mumbai").default,
  nyc: require("./mockCities/nyc").default,
  phoenix: require("./mockCities/phoenix").default,
  rio: require("./mockCities/riodejaneiro").default,
  rome: require("./mockCities/rome").default,
  sanfrancisco: require("./mockCities/sanfrancisco").default,
  saopaulo: require("./mockCities/saopaulo").default,
  seoul: require("./mockCities/seoul").default,
  singapore: require("./mockCities/singapore").default,
  sydney: require("./mockCities/sydney").default,
  toronto: require("./mockCities/toronto").default,
  vegas: require("./mockCities/vegas").default,
};

// Helper functions for city data retrieval
export const getCityData = (cityName: string): CityData | null => {
  const normalized = cityName.toLowerCase().replace(/\s+/g, "");
  return CITY_DATA_MAP[normalized] || null;
};

export const getAllCityNames = (): string[] => Object.keys(CITY_DATA_MAP);

export const getAllCitiesData = (): CityData[] => Object.values(CITY_DATA_MAP);
