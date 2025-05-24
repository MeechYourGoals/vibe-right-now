
export interface SearchStrategy {
  canHandle(query: string): boolean;
  shouldUse(query: string): boolean;
  search(query: string): Promise<string>;
}
