
export const formatTimeAgo = (date: string | Date): string => {
  const now = new Date();
  const pastDate = typeof date === 'string' ? new Date(date) : date;
  const secondsAgo = Math.floor((now.getTime() - pastDate.getTime()) / 1000);
  
  if (secondsAgo < 60) {
    return 'just now';
  }
  
  const minutesAgo = Math.floor(secondsAgo / 60);
  if (minutesAgo < 60) {
    return `${minutesAgo} ${minutesAgo === 1 ? 'minute' : 'minutes'} ago`;
  }
  
  const hoursAgo = Math.floor(minutesAgo / 60);
  if (hoursAgo < 24) {
    return `${hoursAgo} ${hoursAgo === 1 ? 'hour' : 'hours'} ago`;
  }
  
  const daysAgo = Math.floor(hoursAgo / 24);
  if (daysAgo < 7) {
    return `${daysAgo} ${daysAgo === 1 ? 'day' : 'days'} ago`;
  }
  
  const weeksAgo = Math.floor(daysAgo / 7);
  if (weeksAgo < 4) {
    return `${weeksAgo} ${weeksAgo === 1 ? 'week' : 'weeks'} ago`;
  }
  
  const monthsAgo = Math.floor(daysAgo / 30);
  if (monthsAgo < 12) {
    return `${monthsAgo} ${monthsAgo === 1 ? 'month' : 'months'} ago`;
  }
  
  const yearsAgo = Math.floor(daysAgo / 365);
  return `${yearsAgo} ${yearsAgo === 1 ? 'year' : 'years'} ago`;
};

export const formatDate = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatTime = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatDateTime = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return `${formatDate(d)} at ${formatTime(d)}`;
};
