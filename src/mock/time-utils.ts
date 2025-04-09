
// Helper functions for generating timestamps and expiration times

// Get a recent timestamp (n hours ago)
export const getRecentTime = (hoursAgo: number): string => {
  const date = new Date();
  date.setHours(date.getHours() - hoursAgo);
  return date.toISOString();
};

// Get expiry time for a post
// Default is 1 week (168 hours), pinned posts last for 90 days
export const getExpiryTime = (timestamp: string, isPinned: boolean = false): string => {
  const date = new Date(timestamp);
  
  if (isPinned) {
    // For pinned posts: 90 days
    date.setDate(date.getDate() + 90);
  } else {
    // Default: 1 week (168 hours)
    date.setHours(date.getHours() + 168);
  }
  
  return date.toISOString();
};

// Check if timestamp is within the last three months
export const isWithinThreeMonths = (timestamp: string): boolean => {
  const now = new Date();
  const then = new Date(timestamp);
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  
  return then >= threeMonthsAgo && then <= now;
};
