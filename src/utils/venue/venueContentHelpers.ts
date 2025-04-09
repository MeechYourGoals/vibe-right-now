
import { Post, Location } from "@/types";
import { mockLocations } from "@/mock/data";

// Get content for a specific venue
export const getVenueContent = (venueId: string): { venue: Location | null, posts: Post[] } => {
  // Find the venue in mock locations
  const venue = mockLocations.find(loc => loc.id === venueId);
  
  // If venue not found, return empty results
  if (!venue) {
    console.warn(`Venue with ID ${venueId} not found.`);
    return { venue: null, posts: [] };
  }
  
  // Ensure venue has a type
  if (!venue.type) {
    // Default to a general type if not specified
    console.warn(`Venue ${venue.name} has no type. Setting default type.`);
    venue.type = determineVenueType(venue.name);
  }
  
  // Create posts for the venue based on its characteristics
  const posts: Post[] = [];
  
  // Return the venue and posts
  return {
    venue,
    posts
  };
};

// Determine the most likely venue type based on name
export const determineVenueType = (venueName: string = ''): string => {
  const name = venueName.toLowerCase();
  
  if (name.includes('restaurant') || name.includes('cafe') || name.includes('bistro') || 
      name.includes('grill') || name.includes('steakhouse') || name.includes('pizza')) {
    return 'restaurant';
  }
  
  if (name.includes('bar') || name.includes('pub') || name.includes('lounge') || 
      name.includes('club') || name.includes('tavern')) {
    return 'bar';
  }
  
  if (name.includes('hotel') || name.includes('resort') || name.includes('inn') || 
      name.includes('suites')) {
    return 'hotel';
  }
  
  if (name.includes('theater') || name.includes('cinema') || name.includes('theatre')) {
    return 'entertainment';
  }
  
  if (name.includes('stadium') || name.includes('arena') || name.includes('park') || 
      name.includes('field') || name.includes('center')) {
    return 'sports';
  }
  
  if (name.includes('museum') || name.includes('gallery') || name.includes('exhibit')) {
    return 'attraction';
  }
  
  if (name.includes('festival') || name.includes('concert') || name.includes('show') || 
      name.includes('fair')) {
    return 'event';
  }
  
  // Default venue type
  return 'venue';
};

// Ensure a post has proper location data
export const ensurePostLocationData = (post: Post): Post => {
  if (!post.location) {
    console.warn('Post has no location data, adding default location');
    post.location = mockLocations[0];
  }
  
  if (!post.location.type) {
    console.warn(`Location ${post.location.name} has no type, determining type`);
    post.location.type = determineVenueType(post.location.name);
  }
  
  return post;
};

// Create content tags for a venue based on its type
export const getVenueTags = (venue: Location): string[] => {
  const tags: string[] = [venue.type];
  
  // Add relevant tags based on venue type
  switch(venue.type) {
    case 'restaurant':
      tags.push('food', 'dining');
      break;
    case 'bar':
      tags.push('drinks', 'nightlife');
      break;
    case 'hotel':
      tags.push('lodging', 'accommodation');
      break;
    case 'sports':
      tags.push('stadium', 'athletics');
      break;
    case 'event':
      tags.push('entertainment', 'experience');
      break;
    case 'attraction':
      tags.push('tourism', 'sightseeing');
      break;
    case 'entertainment':
      tags.push('leisure', 'recreation');
      break;
  }
  
  return tags;
};
