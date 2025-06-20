import { CityData } from '@/types';
import { chicagoVenues } from './mockCities/chicago';
import { amsterdamVenues } from './mockCities/amsterdam';
import { barcelonaVenues } from './mockCities/barcelona';
import { berlinVenues } from './mockCities/berlin';
import { bangkokVenues } from './mockCities/bangkok';
import { dubaiVenues } from './mockCities/dubai';

export const mockCities: CityData[] = [
  {
    name: "Chicago",
    state: "IL",
    country: "USA",
    lat: 41.8781,
    lng: -87.6298,
    venues: chicagoVenues
  },
  {
    name: "Amsterdam",
    country: "Netherlands",
    lat: 52.3676,
    lng: 4.9041,
    venues: amsterdamVenues
  },
  {
    name: "Barcelona",
    country: "Spain", 
    lat: 41.3851,
    lng: 2.1734,
    venues: barcelonaVenues
  },
  {
    name: "Berlin",
    country: "Germany",
    lat: 52.5200,
    lng: 13.4050,
    venues: berlinVenues
  },
  {
    name: "Bangkok",
    country: "Thailand",
    lat: 13.7563,
    lng: 100.5018,
    venues: bangkokVenues
  },
  {
    name: "Dubai",
    country: "UAE",
    lat: 25.2048,
    lng: 55.2708,
    venues: dubaiVenues
  }
];

export default mockCities;
