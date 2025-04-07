
export const getRecentTime = (hoursAgo = 0) => {
  const date = new Date();
  date.setHours(date.getHours() - hoursAgo);
  return date.toISOString();
};

// Update expiry time to 3 months instead of 24 hours
export const getExpiryTime = (creationTime: string) => {
  const date = new Date(creationTime);
  date.setMonth(date.getMonth() + 3);
  return date.toISOString();
};

// Function to determine if a post is from a specific day of the week
export const isPostFromDayOfWeek = (timestamp: string, dayIndex: number) => {
  const date = new Date(timestamp);
  return date.getDay() === dayIndex; // 0 = Sunday, 1 = Monday, etc.
};

// Function to check if a post is within the 3-month window
export const isWithinThreeMonths = (timestamp: string) => {
  const postDate = new Date(timestamp);
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  return postDate >= threeMonthsAgo;
};
