
// Create a function to generate fake insights data with a realistic pattern
const generateInsightsData = () => {
  return {
    totalVisits: Math.floor(Math.random() * 1000) + 500,
    uniqueVisitors: Math.floor(Math.random() * 500) + 200,
    averageRating: (Math.random() * 2) + 3,
    topReasons: [
      { reason: "Great atmosphere", count: Math.floor(Math.random() * 100) + 50 },
      { reason: "Live music", count: Math.floor(Math.random() * 80) + 40 },
      { reason: "Happy hour deals", count: Math.floor(Math.random() * 60) + 30 },
      { reason: "Food quality", count: Math.floor(Math.random() * 40) + 20 }
    ],
    demographics: {
      ageGroups: {
        "18-24": Math.floor(Math.random() * 30) + 10,
        "25-34": Math.floor(Math.random() * 40) + 20,
        "35-44": Math.floor(Math.random() * 30) + 10,
        "45+": Math.floor(Math.random() * 20) + 5
      },
      genderDistribution: {
        "Male": Math.floor(Math.random() * 60) + 40,
        "Female": Math.floor(Math.random() * 60) + 40,
        "Other": Math.floor(Math.random() * 10) + 1
      }
    },
    visitsByDay: {
      "Monday": Math.floor(Math.random() * 50) + 20,
      "Tuesday": Math.floor(Math.random() * 60) + 30,
      "Wednesday": Math.floor(Math.random() * 70) + 40,
      "Thursday": Math.floor(Math.random() * 90) + 60,
      "Friday": Math.floor(Math.random() * 150) + 100,
      "Saturday": Math.floor(Math.random() * 180) + 140,
      "Sunday": Math.floor(Math.random() * 100) + 80
    },
    visitsByHour: {
      "12PM-2PM": Math.floor(Math.random() * 40) + 20,
      "2PM-4PM": Math.floor(Math.random() * 30) + 15,
      "4PM-6PM": Math.floor(Math.random() * 60) + 40,
      "6PM-8PM": Math.floor(Math.random() * 100) + 80,
      "8PM-10PM": Math.floor(Math.random() * 120) + 100,
      "10PM-12AM": Math.floor(Math.random() * 80) + 60,
      "12AM-2AM": Math.floor(Math.random() * 40) + 20
    }
  };
};

// Generate current insights
export const currentInsights = generateInsightsData();

// Generate historical insights with some variations
export const historicalInsights = {
  lastWeek: generateInsightsData(),
  lastMonth: generateInsightsData(),
  lastQuarter: generateInsightsData(),
  lastYear: generateInsightsData()
};

// Export a function to get data for a specific time period
export const getInsightsForPeriod = (period: 'day' | 'week' | 'month' | 'quarter' | 'year') => {
  switch (period) {
    case 'day':
      return currentInsights;
    case 'week':
      return historicalInsights.lastWeek;
    case 'month':
      return historicalInsights.lastMonth;
    case 'quarter':
      return historicalInsights.lastQuarter;
    case 'year':
      return historicalInsights.lastYear;
    default:
      return currentInsights;
  }
};
