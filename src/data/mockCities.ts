
// Export city data properly
export { default as amsterdam } from './mockCities/amsterdam';
export { default as chicago } from './mockCities/chicago';
export { default as la } from './mockCities/la';
export { default as nyc } from './mockCities/nyc';
export { default as phoenix } from './mockCities/phoenix';
export { default as miami } from './mockCities/miami';
export { default as vegas } from './mockCities/vegas';
export { default as toronto } from './mockCities/toronto';
export { default as melbourne } from './mockCities/melbourne';
export { default as mumbai } from './mockCities/mumbai';
export { default as moscow } from './mockCities/moscow';
export { default as paris } from './mockCities/paris';
export { default as rome } from './mockCities/rome';
export { default as seoul } from './mockCities/seoul';
export { default as singapore } from './mockCities/singapore';
export { default as sydney } from './mockCities/sydney';
export { default as tokyo } from './mockCities/tokyo';
export { default as sanfrancisco } from './mockCities/sanfrancisco';
export { default as saopaulo } from './mockCities/saopaulo';
export { default as riodejaneiro } from './mockCities/riodejaneiro';

// Create location arrays for backward compatibility
import amsterdamData from './mockCities/amsterdam';
import chicagoData from './mockCities/chicago';
import laData from './mockCities/la';

export const amsterdamLocations = amsterdamData.venues;
export const chicagoLocations = chicagoData.venues;
export const laLocations = laData.venues;
