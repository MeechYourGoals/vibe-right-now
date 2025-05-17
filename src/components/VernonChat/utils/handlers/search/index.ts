
import { SearchCoordinator } from './SearchCoordinator';

export * from './searchTypes';
export { SearchCoordinator };

// Re-export search strategies for convenience
export * from './comedySearchStrategy';
export * from './complexQueryStrategy';
export * from './fallbackSearchStrategy';
export * from './localDataStrategy';
export * from './locationSearchStrategy';
