// Import necessary types and utilities
import { Location } from '@/types';
import { formatTimeToAmPm } from '@/utils/businessHoursUtils';

// Instead of adding userProfile directly to each location object, we'll modify the implementation
// to avoid the type error, while ensuring the functionality remains the same

export const generateMockLocations = () => {
  // Location 1
  const location1 = {
    id: '1',
    name: 'Sunset Lounge',
    address: '123 Sunset Blvd',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90210',
    lat: 34.0522,
    lng: -118.2437,
    type: 'bar',
    description: 'A trendy rooftop bar with stunning sunset views over Los Angeles.',
    phone: '310-555-1234',
    website: 'https://sunsetlounge.example.com',
    capacity: 200,
    hours: {
      monday: ['16:00', '2:00'],
      tuesday: ['16:00', '2:00'],
      wednesday: ['16:00', '2:00'],
      thursday: ['16:00', '2:00'],
      friday: ['16:00', '4:00'],
      saturday: ['16:00', '4:00'],
      sunday: ['16:00', '0:00'],
    },
    pictures: [
      'https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80',
      'https://images.unsplash.com/photo-1525268323446-0505b6fe7778?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
    ],
    rating: 4.5,
    priceRange: '$$$',
    tags: ['rooftop', 'cocktails', 'view', 'lounge'],
    venueId: 'venue1',
    // Removing userProfile from location object
  };

  // Location 2
  const location2 = {
    id: '2',
    name: 'Artisan Coffee House',
    address: '456 Main St',
    city: 'Portland',
    state: 'OR',
    zipCode: '97205',
    lat: 45.5231,
    lng: -122.6765,
    type: 'cafe',
    description: 'A cozy coffee shop featuring locally roasted beans and homemade pastries.',
    phone: '503-555-6789',
    website: 'https://artisancoffee.example.com',
    hours: {
      monday: ['6:00', '20:00'],
      tuesday: ['6:00', '20:00'],
      wednesday: ['6:00', '20:00'],
      thursday: ['6:00', '20:00'],
      friday: ['6:00', '22:00'],
      saturday: ['7:00', '22:00'],
      sunday: ['7:00', '18:00'],
    },
    pictures: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1347&q=80',
      'https://images.unsplash.com/photo-1463797221720-6b07e6426c24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
    ],
    rating: 4.2,
    priceRange: '$$',
    tags: ['coffee', 'pastries', 'cozy', 'wifi'],
    venueId: 'venue2',
    // Removing userProfile property
  };

  // Location 3
  const location3 = {
    id: '3',
    name: 'Skyline Night Club',
    address: '789 Tower Ave',
    city: 'Miami',
    state: 'FL',
    zipCode: '33101',
    lat: 25.7617,
    lng: -80.1918,
    type: 'nightclub',
    description: 'Miami\'s hottest nightclub with world-class DJs and panoramic city views.',
    phone: '305-555-9876',
    website: 'https://skylinenightclub.example.com',
    capacity: 500,
    hours: {
      monday: ['22:00', '4:00'],
      tuesday: ['22:00', '4:00'],
      wednesday: ['22:00', '4:00'],
      thursday: ['22:00', '4:00'],
      friday: ['22:00', '6:00'],
      saturday: ['22:00', '6:00'],
      sunday: ['22:00', '4:00'],
    },
    pictures: [
      'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80',
    ],
    rating: 4.7,
    priceRange: '$$$$',
    tags: ['nightclub', 'dancing', 'DJ', 'VIP'],
    venueId: 'venue3',
    // Removing userProfile property
  };

  // Location 4
  const location4 = {
    id: '4',
    name: 'The Rustic Tavern',
    address: '321 Oak St',
    city: 'Austin',
    state: 'TX',
    zipCode: '78701',
    lat: 30.2672,
    lng: -97.7431,
    type: 'pub',
    description: 'A laid-back pub with live music, craft beers, and Texas-style BBQ.',
    phone: '512-555-4321',
    website: 'https://rustictavern.example.com',
    capacity: 150,
    hours: {
      monday: ['16:00', '0:00'],
      tuesday: ['16:00', '0:00'],
      wednesday: ['16:00', '0:00'],
      thursday: ['16:00', '1:00'],
      friday: ['16:00', '2:00'],
      saturday: ['14:00', '2:00'],
      sunday: ['14:00', '0:00'],
    },
    pictures: [
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80',
      'https://images.unsplash.com/photo-1555658636-6e4a36218be7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    ],
    rating: 4.3,
    priceRange: '$$',
    tags: ['pub', 'live music', 'craft beer', 'BBQ'],
    venueId: 'venue4',
    // Removing userProfile property
  };

  // Location 5
  const location5 = {
    id: '5',
    name: 'Zen Garden Restaurant',
    address: '555 Lotus Ln',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94102',
    lat: 37.7749,
    lng: -122.4194,
    type: 'restaurant',
    description: 'An elegant Asian fusion restaurant with a peaceful garden setting.',
    phone: '415-555-8765',
    website: 'https://zengarden.example.com',
    capacity: 80,
    hours: {
      monday: ['17:00', '22:00'],
      tuesday: ['17:00', '22:00'],
      wednesday: ['17:00', '22:00'],
      thursday: ['17:00', '23:00'],
      friday: ['17:00', '23:00'],
      saturday: ['16:00', '23:00'],
      sunday: ['16:00', '22:00'],
    },
    pictures: [
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    ],
    rating: 4.6,
    priceRange: '$$$',
    tags: ['asian fusion', 'sushi', 'garden', 'romantic'],
    venueId: 'venue5',
    // Removing userProfile property
  };

  // Location 6
  const location6 = {
    id: '6',
    name: 'Fitness First Gym',
    address: '888 Muscle Ave',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60601',
    lat: 41.8781,
    lng: -87.6298,
    type: 'gym',
    description: 'A modern fitness center with state-of-the-art equipment and expert trainers.',
    phone: '312-555-2468',
    website: 'https://fitnessfirst.example.com',
    capacity: 200,
    hours: {
      monday: ['5:00', '23:00'],
      tuesday: ['5:00', '23:00'],
      wednesday: ['5:00', '23:00'],
      thursday: ['5:00', '23:00'],
      friday: ['5:00', '22:00'],
      saturday: ['7:00', '20:00'],
      sunday: ['7:00', '20:00'],
    },
    pictures: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    ],
    rating: 4.1,
    priceRange: '$$',
    tags: ['gym', 'fitness', 'personal training', '24/7'],
    venueId: 'venue6',
    // Removing userProfile property
  };

  // Location 7
  const location7 = {
    id: '7',
    name: 'Beachside Resort',
    address: '123 Coastal Hwy',
    city: 'Honolulu',
    state: 'HI',
    zipCode: '96815',
    lat: 21.3069,
    lng: -157.8583,
    type: 'hotel',
    description: 'A luxury beachfront resort with stunning ocean views and world-class amenities.',
    phone: '808-555-1357',
    website: 'https://beachsideresort.example.com',
    capacity: 300,
    hours: {
      monday: ['0:00', '23:59'],
      tuesday: ['0:00', '23:59'],
      wednesday: ['0:00', '23:59'],
      thursday: ['0:00', '23:59'],
      friday: ['0:00', '23:59'],
      saturday: ['0:00', '23:59'],
      sunday: ['0:00', '23:59'],
    },
    pictures: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80',
    ],
    rating: 4.8,
    priceRange: '$$$$',
    tags: ['resort', 'beach', 'spa', 'luxury'],
    venueId: 'venue7',
    // Removing userProfile property
  };

  return [location1, location2, location3, location4, location5, location6, location7];
};

export const formatLocationHours = (hours: Record<string, string[]>): string => {
  if (!hours) return 'Hours not available';
  
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const currentDayIndex = new Date().getDay(); // 0 is Sunday
  const reorderedDays = [...days.slice(currentDayIndex === 0 ? 6 : currentDayIndex - 1), ...days.slice(0, currentDayIndex === 0 ? 6 : currentDayIndex - 1)];
  
  const todayIdx = reorderedDays.findIndex(day => day === days[(currentDayIndex === 0 ? 6 : currentDayIndex - 1)]);
  
  return reorderedDays.map((day, index) => {
    const isToday = index === todayIdx;
    const dayHours = hours[day];
    
    if (!dayHours || !Array.isArray(dayHours) || dayHours.length < 2) {
      return `${day.charAt(0).toUpperCase() + day.slice(1)}: Closed ${isToday ? '(Today)' : ''}`;
    }
    
    const [open, close] = dayHours;
    return `${day.charAt(0).toUpperCase() + day.slice(1)}: ${formatTimeToAmPm(open)} - ${formatTimeToAmPm(close)} ${isToday ? '(Today)' : ''}`;
  }).join('\n');
};

export const getLocationStatus = (hours: Record<string, string[]>): string => {
  if (!hours) return 'Hours not available';
  
  // Get current day and time
  const now = new Date();
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const currentDay = days[now.getDay()];
  
  // Check if there are hours for today
  if (!hours[currentDay] || !Array.isArray(hours[currentDay]) || hours[currentDay].length < 2) {
    return 'Closed';
  }
  
  const todayHours = hours[currentDay];
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  // Parse opening and closing times
  const [openingTime, closingTime] = todayHours.map(timeStr => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return { hours, minutes };
  });
  
  // Handle overnight hours (if closing time is earlier than opening time)
  if (closingTime.hours < openingTime.hours) {
    // Venue is open overnight
    return (currentHour > openingTime.hours || 
            (currentHour === openingTime.hours && currentMinute >= openingTime.minutes)) || 
           (currentHour < closingTime.hours || 
            (currentHour === closingTime.hours && currentMinute <= closingTime.minutes))
           ? 'Open Now'
           : 'Closed';
  }
  
  // Normal hours (same day)
  return (currentHour > openingTime.hours || 
          (currentHour === openingTime.hours && currentMinute >= openingTime.minutes)) && 
         (currentHour < closingTime.hours || 
          (currentHour === closingTime.hours && currentMinute <= closingTime.minutes))
         ? 'Open Now'
         : 'Closed';
};

export const getTodaysHours = (hours: Record<string, string[]>): string => {
  if (!hours) return 'Hours not available';
  
  // Get current day
  const now = new Date();
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const currentDay = days[now.getDay()];
  
  // Check if there are hours for today
  if (!hours[currentDay] || !Array.isArray(hours[currentDay]) || hours[currentDay].length < 2) {
    return 'Closed today';
  }
  
  const [open, close] = hours[currentDay];
  return `${formatTimeToAmPm(open)} - ${formatTimeToAmPm(close)}`;
};
