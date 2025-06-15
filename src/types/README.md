# Type System Architecture

This directory contains the comprehensive type system for the Vibe application, organized into logical modules for better maintainability and developer experience.

## Structure

### Core Types (`/core`)
- **`base.ts`** - Fundamental types used throughout the application
  - `BaseEntity` - Common entity properties (id, timestamps)
  - `GeoCoordinates` - Location coordinates
  - `Address` - Address information
  - `MediaItem` - Media content structure
  - `UserProfile` - Basic user profile information

- **`api.ts`** - API-related types
  - `ApiResponse<T>` - Standardized API response format
  - `PaginationMeta` - Pagination metadata
  - `RequestConfig` - HTTP request configuration
  - `AuthConfig` - Authentication configuration

### Entity Types (`/entities`)
- **`user.ts`** - Complete user entity system
  - `User` - Full user entity with all properties
  - `UserSubscription` - Subscription tiers and features
  - `UserPreferences` - User preferences and settings
  - `UserStats` - User statistics and metrics

- **`venue.ts`** - Comprehensive venue system
  - `Venue` - Complete venue entity
  - `BusinessHours` - Operating hours with timezone support
  - `VenueAmenities` - Available amenities and features
  - `VenueStats` - Analytics and performance metrics

- **`content.ts`** - Content management system
  - `Post` - Social media posts with full metadata
  - `Comment` - Comment system with replies
  - `Story` - Temporary content (stories)
  - `PostEngagement` - Engagement tracking

- **`messaging.ts`** - Messaging and communication
  - `Conversation` - Chat conversations
  - `Message` - Individual messages with rich content
  - `ChatBot` - Automated messaging system

- **`events.ts`** - Event management system
  - `Event` - Complete event entity
  - `EventTicketing` - Ticketing and sales
  - `EventPromotion` - Marketing and promotion

### Feature Types (`/features`)
- **`chat.ts`** - AI chat and assistance
  - `ChatSession` - Chat session management
  - `ChatMessage` - Chat-specific message format
  - `VoiceSettings` - Voice interaction configuration
  - `ChatAnalytics` - Chat performance metrics

- **`search.ts`** - Search and discovery
  - `SearchQuery` - Comprehensive search interface
  - `SearchFilters` - Advanced filtering options
  - `SearchResult<T>` - Generic search result format
  - `AutocompleteRequest` - Search suggestions

- **`analytics.ts`** - Analytics and insights
  - `AnalyticsEvent` - Event tracking system
  - `MetricDefinition` - Custom metrics
  - `Dashboard` - Analytics dashboards
  - `Experiment` - A/B testing framework

## Design Principles

### 1. **Composability**
Types are designed to be composed together, with shared interfaces and consistent patterns.

```typescript
interface Post extends BaseEntity, Timestamps {
  engagement: PostEngagement;
  metadata: PostMetadata;
}
```

### 2. **Extensibility**
All entities support metadata and custom properties for future expansion.

```typescript
interface Venue extends BaseEntity {
  metadata?: Record<string, any>;
  customFields?: Record<string, any>;
}
```

### 3. **Type Safety**
Strong typing with union types for better compile-time safety.

```typescript
type EventStatus = 'draft' | 'published' | 'live' | 'completed' | 'cancelled';
type SubscriptionTier = 'free' | 'plus' | 'premium' | 'pro';
```

### 4. **Backwards Compatibility**
Legacy types are maintained in `index.ts` for existing code.

### 5. **Generic Support**
Types support generics for flexibility.

```typescript
interface SearchResult<T = any> {
  item: T;
  score: number;
}

interface ApiResponse<T = any> {
  data?: T;
  error?: ApiError;
}
```

## Usage Examples

### Defining a User
```typescript
import { User, UserSubscription } from '@/types/entities/user';

const user: User = {
  id: 'user-123',
  username: 'johndoe',
  displayName: 'John Doe',
  email: 'john@example.com',
  subscription: {
    tier: 'premium',
    isActive: true,
    features: { /* ... */ }
  },
  // ... other properties
};
```

### Search Implementation
```typescript
import { SearchQuery, SearchFilters } from '@/types/features/search';

const searchQuery: SearchQuery = {
  query: 'coffee shops near me',
  type: 'venues',
  filters: {
    location: {
      coordinates: { lat: 40.7128, lng: -74.0060 },
      radius: 1000
    },
    category: ['cafe', 'restaurant'],
    price: { level: [1, 2] }
  }
};
```

### Chat Integration
```typescript
import { ChatSession, ChatMessage } from '@/types/features/chat';

const chatSession: ChatSession = {
  id: 'session-123',
  userId: 'user-123',
  mode: 'concierge',
  messages: [],
  settings: {
    personality: 'friendly',
    responseStyle: {
      tone: 'casual',
      length: 'moderate'
    }
  }
};
```

## Migration Guide

When migrating from legacy types:

1. **Import from specific modules** instead of the general index
2. **Update interfaces** to use the new comprehensive types
3. **Add proper error handling** using the new `ApiResponse<T>` format
4. **Implement proper pagination** using `PaginationMeta`

### Before
```typescript
import { User } from '@/types';

interface SimpleUser {
  id: string;
  name: string;
}
```

### After
```typescript
import { User, UserProfile } from '@/types/entities/user';
import { ApiResponse } from '@/types/core/api';

interface UserResponse extends ApiResponse<User> {}
```

## Best Practices

1. **Always extend base types** when creating new entities
2. **Use union types** for status and categorical fields
3. **Include proper documentation** in type definitions
4. **Prefer composition** over inheritance
5. **Keep types focused** - one responsibility per type
6. **Use generics** for reusable patterns
7. **Include validation types** when needed

## Performance Considerations

- Types are tree-shakable when imported specifically
- Use `Partial<T>` for optional updates
- Leverage `Pick<T, K>` and `Omit<T, K>` for API interfaces
- Consider using `ReadOnly<T>` for immutable data

## Contributing

When adding new types:

1. Place them in the appropriate module
2. Follow existing naming conventions
3. Include JSDoc documentation
4. Add examples to this README
5. Update the index.ts exports
6. Consider backwards compatibility
