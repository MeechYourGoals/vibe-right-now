
// Centralized mock data exports
export { mockPosts } from './posts';
export { mockComments } from './comments';
export { mockLocations } from './locations';
export { mockUsers, celebrityUsers, regularUsers } from './users';
export { mockDiscountOffers } from './discountOffers';
export { cityLocations } from './cityLocations';

// Re-export city data
export { default as amsterdamData } from '../data/mockCities/amsterdam';
export { default as bangkokData } from '../data/mockCities/bangkok';
export { default as barcelonaData } from '../data/mockCities/barcelona';
export { default as berlinData } from '../data/mockCities/berlin';
export { default as chicagoData } from '../data/mockCities/chicago';
export { default as dubaiData } from '../data/mockCities/dubai';
export { default as istanbulData } from '../data/mockCities/istanbul';
export { default as laData } from '../data/mockCities/la';
export { default as londonData } from '../data/mockCities/london';
export { default as melbourneData } from '../data/mockCities/melbourne';
export { default as miamiData } from '../data/mockCities/miami';
export { default as moscowData } from '../data/mockCities/moscow';
export { default as mumbaiData } from '../data/mockCities/mumbai';
export { default as nycData } from '../data/mockCities/nyc';
export { default as parisData } from '../data/mockCities/paris';
export { default as phoenixData } from '../data/mockCities/phoenix';
export { default as rioData } from '../data/mockCities/riodejaneiro';
export { default as sanFranciscoData } from '../data/mockCities/sanfrancisco';
export { default as saoPauloData } from '../data/mockCities/saopaulo';
export { default as seoulData } from '../data/mockCities/seoul';
export { default as singaporeData } from '../data/mockCities/singapore';
export { default as sydneyData } from '../data/mockCities/sydney';
export { default as tokyoData } from '../data/mockCities/tokyo';
export { default as torontoData } from '../data/mockCities/toronto';
export { default as vegasData } from '../data/mockCities/vegas';
export { default as romeData } from '../data/mockCities/rome';

// City data collection
export const allCityData = [
  amsterdamData, bangkokData, barcelonaData, berlinData, chicagoData,
  dubaiData, istanbulData, laData, londonData, melbourneData,
  miamiData, moscowData, mumbaiData, nycData, parisData,
  phoenixData, rioData, sanFranciscoData, saoPauloData, seoulData,
  singaporeData, sydneyData, tokyoData, torontoData, vegasData, romeData
];
