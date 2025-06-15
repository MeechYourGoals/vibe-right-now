
import { SearchCoordinator } from './SearchCoordinator';
import { SearchStrategyFactory } from './SearchStrategyFactory';

export * from './types';
export { SearchCoordinator, SearchStrategyFactory };

// Re-export strategies for convenience
export * from './strategies/LocationSearchStrategy';
export * from './strategies/ComedySearchStrategy';
export * from './strategies/ComplexQueryStrategy';
export * from './strategies/FallbackSearchStrategy';
