
/**
 * Multi-provider system to access various search and AI services
 */

// Provider interface
export interface Provider {
  id: string;
  name: string;
  type: 'search' | 'chat' | 'both';
  description: string;
  isAvailable: boolean;
  priority: number;
}

// Available providers in the system
export const availableProviders: Provider[] = [
  {
    id: 'vertex-ai',
    name: 'Google Vertex AI',
    type: 'both',
    description: 'Google Vertex AI powered search and chat',
    isAvailable: true,
    priority: 100
  },
  {
    id: 'vector-search',
    name: 'Vector Search',
    type: 'search',
    description: 'Semantic vector search using embeddings',
    isAvailable: true,
    priority: 90
  },
  {
    id: 'swirl',
    name: 'Swirl Search',
    type: 'search',
    description: 'Local search index for venue and location data',
    isAvailable: true,
    priority: 80
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    type: 'both',
    description: 'Perplexity API for search and chat',
    isAvailable: false,
    priority: 70
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    type: 'chat',
    description: 'Google Gemini model for chat capabilities',
    isAvailable: true,
    priority: 60
  },
  {
    id: 'google-search',
    name: 'Google Search',
    type: 'search',
    description: 'Google search API for web results',
    isAvailable: false,
    priority: 50
  }
];

/**
 * Get available providers by type
 */
export function getProvidersByType(type: 'search' | 'chat' | 'both'): Provider[] {
  return availableProviders
    .filter(provider => provider.isAvailable && (provider.type === type || provider.type === 'both'))
    .sort((a, b) => b.priority - a.priority);
}

/**
 * Get the highest priority provider for a specific type
 */
export function getPrimaryProvider(type: 'search' | 'chat' | 'both'): Provider | null {
  const providers = getProvidersByType(type);
  return providers.length > 0 ? providers[0] : null;
}

/**
 * Get fallback providers for a specific type (excluding the primary)
 */
export function getFallbackProviders(type: 'search' | 'chat' | 'both'): Provider[] {
  const providers = getProvidersByType(type);
  return providers.length > 1 ? providers.slice(1) : [];
}

/**
 * Update provider availability status
 */
export function updateProviderStatus(providerId: string, isAvailable: boolean): void {
  const provider = availableProviders.find(p => p.id === providerId);
  if (provider) {
    provider.isAvailable = isAvailable;
  }
}

/**
 * Set all provider statuses at once (useful when loading from settings)
 */
export function setProviderStatuses(statuses: Record<string, boolean>): void {
  Object.entries(statuses).forEach(([id, status]) => {
    updateProviderStatus(id, status);
  });
}

/**
 * Check if a specific provider is available
 */
export function isProviderAvailable(providerId: string): boolean {
  const provider = availableProviders.find(p => p.id === providerId);
  return provider ? provider.isAvailable : false;
}

/**
 * Initialize providers based on API key availability
 */
export function initializeProviders(): void {
  // Try to get API key status
  const hasVertexAIKey = Boolean(localStorage.getItem('hasVertexAIKey'));
  const hasGeminiKey = Boolean(localStorage.getItem('hasGeminiKey'));
  
  if (hasVertexAIKey) {
    updateProviderStatus('vertex-ai', true);
    console.log('MCP: Vertex AI provider enabled based on API key');
  }
  
  if (hasGeminiKey) {
    updateProviderStatus('gemini', true);
    console.log('MCP: Gemini provider enabled based on API key');
  }
}

// Load provider statuses from localStorage on initialization
try {
  const savedStatuses = localStorage.getItem('mcp-provider-statuses');
  if (savedStatuses) {
    setProviderStatuses(JSON.parse(savedStatuses));
  }
  
  // Check for API keys
  initializeProviders();
} catch (error) {
  console.error('Error loading provider statuses:', error);
}
