
// Generate relevant vibe tags for posts based on content and location
export const generateVibeTags = (post: { content: string; location?: { type?: string; name?: string } }): string[] => {
  const tags: string[] = [];
  const content = post.content.toLowerCase();
  const locationType = post.location?.type?.toLowerCase();
  const locationName = post.location?.name?.toLowerCase() || '';

  // Content-based tags
  if (content.includes('workout') || content.includes('gym') || content.includes('fitness') || content.includes('exercise')) {
    tags.push('Exercise');
  }
  
  if (content.includes('food') || content.includes('meal') || content.includes('delicious') || content.includes('eating')) {
    tags.push('Food');
  }
  
  if (content.includes('music') || content.includes('concert') || content.includes('band') || content.includes('song')) {
    tags.push('Music');
  }
  
  if (content.includes('cozy') || content.includes('relaxing') || content.includes('chill') || content.includes('peaceful')) {
    tags.push('Cozy');
  }
  
  if (content.includes('family') || content.includes('kids') || content.includes('children') || content.includes('child')) {
    tags.push('Family Friendly');
  }
  
  if (content.includes('local') || content.includes('small business') || content.includes('independent')) {
    tags.push('Small Business');
  }
  
  if (content.includes('game') || content.includes('sport') || content.includes('match') || content.includes('team')) {
    tags.push('Sports');
  }
  
  if (content.includes('art') || content.includes('creative') || content.includes('gallery') || content.includes('artist')) {
    tags.push('Arts');
  }
  
  if (content.includes('date') || content.includes('romantic') || content.includes('couple') || content.includes('anniversary')) {
    tags.push('Romantic');
  }
  
  if (content.includes('nightlife') || content.includes('party') || content.includes('dancing') || content.includes('drinks')) {
    tags.push('Nightlife');
  }

  // Location-based tags
  if (locationType) {
    switch (locationType) {
      case 'restaurant':
        tags.push('Food');
        break;
      case 'bar':
      case 'nightclub':
        tags.push('Nightlife');
        break;
      case 'sports':
        tags.push('Sports');
        break;
      case 'cafe':
        tags.push('Cozy');
        break;
      case 'mall':
        tags.push('Shopping');
        break;
      case 'attraction':
        tags.push('Tourism');
        break;
    }
  }

  // Location name-based tags
  if (locationName.includes('gym') || locationName.includes('fitness')) {
    tags.push('Exercise');
  }
  if (locationName.includes('park') || locationName.includes('garden')) {
    tags.push('Outdoor');
  }
  if (locationName.includes('museum') || locationName.includes('gallery')) {
    tags.push('Arts');
  }

  // Remove duplicates and return up to 3 tags
  return [...new Set(tags)].slice(0, 3);
};

// Predefined vibe tags for variety
export const getRandomVibeTags = (): string[] => {
  const allTags = [
    'Sports', 'Music', 'Food', 'Exercise', 'Cozy', 'Family Friendly', 
    'Small Business', 'Arts', 'Romantic', 'Nightlife', 'Shopping', 
    'Tourism', 'Outdoor', 'Trendy', 'Casual', 'Upscale', 'Historic'
  ];
  
  // Return 1-3 random tags
  const numberOfTags = Math.floor(Math.random() * 3) + 1;
  const shuffled = [...allTags].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numberOfTags);
};
