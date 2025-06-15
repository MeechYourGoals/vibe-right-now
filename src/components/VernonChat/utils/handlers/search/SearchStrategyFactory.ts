
import { SearchStrategy } from './types';
import { LocationSearchStrategy } from './strategies/LocationSearchStrategy';
import { ComedySearchStrategy } from './strategies/ComedySearchStrategy';
import { ComplexQueryStrategy } from './strategies/ComplexQueryStrategy';
import { FallbackSearchStrategy } from './strategies/FallbackSearchStrategy';

export class SearchStrategyFactory {
  private static strategies: SearchStrategy[] = [
    new LocationSearchStrategy(),
    new ComedySearchStrategy(),
    new ComplexQueryStrategy(),
    new FallbackSearchStrategy()
  ];

  /**
   * Get the most appropriate search strategy for a given query
   */
  static getStrategy(query: string): SearchStrategy {
    for (const strategy of this.strategies) {
      if (strategy.canHandle(query)) {
        return strategy;
      }
    }
    
    // Return fallback if no specific strategy matches
    return this.strategies[this.strategies.length - 1];
  }

  /**
   * Execute search using the best strategy for the query
   */
  static async executeSearch(query: string, options?: any): Promise<string> {
    const strategy = this.getStrategy(query);
    console.log(`Using search strategy: ${strategy.constructor.name}`);
    
    try {
      return await strategy.execute(query, options);
    } catch (error) {
      console.error(`Error in ${strategy.constructor.name}:`, error);
      
      // Fallback to the last strategy (FallbackSearchStrategy)
      const fallbackStrategy = this.strategies[this.strategies.length - 1];
      return await fallbackStrategy.execute(query, options);
    }
  }

  /**
   * Register a new search strategy
   */
  static registerStrategy(strategy: SearchStrategy, priority: number = 0): void {
    // Insert at the specified priority (lower number = higher priority)
    this.strategies.splice(priority, 0, strategy);
  }
}
