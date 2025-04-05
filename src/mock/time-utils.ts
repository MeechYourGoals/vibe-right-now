
export const getRecentTime = (hoursAgo = 0) => {
  const date = new Date();
  date.setHours(date.getHours() - hoursAgo);
  return date.toISOString();
};

export const getExpiryTime = (creationTime: string) => {
  const date = new Date(creationTime);
  date.setHours(date.getHours() + 24);
  return date.toISOString();
};
