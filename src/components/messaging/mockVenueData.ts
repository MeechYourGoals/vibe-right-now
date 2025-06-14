
export interface VenueMessage {
  id: string;
  content: string;
  timestamp: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderType: 'user' | 'venue';
  messageType?: 'promotional' | 'reservation' | 'loyalty' | 'general' | 'class' | 'bottle_service';
}

export interface MockVenueConversation {
  id: string;
  venueId: string;
  venueName: string;
  venueAvatar: string;
  venueType: string;
  lastMessage?: VenueMessage;
  unreadCount: number;
  isActive: boolean;
  responseTime: string;
  messages: VenueMessage[];
}

export const mockVenueConversations: MockVenueConversation[] = [
  {
    id: '1',
    venueId: 'venue-1',
    venueName: 'The Rooftop Bar',
    venueAvatar: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=100&h=100&fit=crop&auto=format',
    venueType: 'Bar',
    unreadCount: 1,
    isActive: true,
    responseTime: 'Usually responds within an hour',
    messages: [
      {
        id: '1-1',
        content: 'Thanks for your inquiry! We have availability for tonight.',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        senderId: 'venue-1',
        senderName: 'The Rooftop Bar',
        senderAvatar: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=100&h=100&fit=crop&auto=format',
        senderType: 'venue',
        messageType: 'reservation'
      }
    ],
    lastMessage: {
      id: '1-1',
      content: 'Thanks for your inquiry! We have availability for tonight.',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      senderId: 'venue-1',
      senderName: 'The Rooftop Bar',
      senderAvatar: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=100&h=100&fit=crop&auto=format',
      senderType: 'venue',
      messageType: 'reservation'
    }
  },
  {
    id: '2',
    venueId: 'venue-2',
    venueName: "Barry's Bootcamp",
    venueAvatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&auto=format',
    venueType: 'Fitness',
    unreadCount: 2,
    isActive: true,
    responseTime: 'Usually responds within 30 minutes',
    messages: [
      {
        id: '2-1',
        content: 'Great workout today! As mentioned in class we\'ll be holding private sessions next Saturday until noon, let us know if you want to sign up and reminder normal classes are closed 9am to 12pm',
        timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        senderId: 'venue-2',
        senderName: "Barry's Bootcamp",
        senderAvatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&auto=format',
        senderType: 'venue',
        messageType: 'class'
      },
      {
        id: '2-2',
        content: 'Also, since you\'re a regular, you get priority booking for our new HIIT classes starting next month! 💪',
        timestamp: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
        senderId: 'venue-2',
        senderName: "Barry's Bootcamp",
        senderAvatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&auto=format',
        senderType: 'venue',
        messageType: 'loyalty'
      }
    ],
    lastMessage: {
      id: '2-2',
      content: 'Also, since you\'re a regular, you get priority booking for our new HIIT classes starting next month! 💪',
      timestamp: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
      senderId: 'venue-2',
      senderName: "Barry's Bootcamp",
      senderAvatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&auto=format',
      senderType: 'venue',
      messageType: 'loyalty'
    }
  },
  {
    id: '3',
    venueId: 'venue-3',
    venueName: 'Encore Beach Club',
    venueAvatar: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=100&h=100&fit=crop&auto=format',
    venueType: 'Nightclub',
    unreadCount: 1,
    isActive: true,
    responseTime: 'Usually responds within 15 minutes',
    messages: [
      {
        id: '3-1',
        content: 'If you\'re nearby we\'re currently offering 50% off bottle service from 10pm to 11:30pm, ask for Rodrigo at the door! 🍾',
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        senderId: 'venue-3',
        senderName: 'Encore Beach Club',
        senderAvatar: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=100&h=100&fit=crop&auto=format',
        senderType: 'venue',
        messageType: 'bottle_service'
      }
    ],
    lastMessage: {
      id: '3-1',
      content: 'If you\'re nearby we\'re currently offering 50% off bottle service from 10pm to 11:30pm, ask for Rodrigo at the door! 🍾',
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      senderId: 'venue-3',
      senderName: 'Encore Beach Club',
      senderAvatar: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=100&h=100&fit=crop&auto=format',
      senderType: 'venue',
      messageType: 'bottle_service'
    }
  },
  {
    id: '4',
    venueId: 'venue-4',
    venueName: 'Blue Note Jazz Club',
    venueAvatar: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&h=100&fit=crop&auto=format',
    venueType: 'Music Venue',
    unreadCount: 0,
    isActive: true,
    responseTime: 'Usually responds within 2 hours',
    messages: [
      {
        id: '4-1',
        content: 'We\'ve noticed we\'ve pinned several of your posts, thanks for being a great customer here\'s a coupon code for your next visit: JAZZLOVER20 🎷',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        senderId: 'venue-4',
        senderName: 'Blue Note Jazz Club',
        senderAvatar: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&h=100&fit=crop&auto=format',
        senderType: 'venue',
        messageType: 'loyalty'
      },
      {
        id: '4-2',
        content: 'Thanks so much! I love coming here',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5).toISOString(),
        senderId: 'current-user',
        senderName: 'You',
        senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&auto=format',
        senderType: 'user'
      },
      {
        id: '4-3',
        content: 'That means a lot! Tonight we have Marcus Miller performing at 9pm - hope to see you there! 🎵',
        timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        senderId: 'venue-4',
        senderName: 'Blue Note Jazz Club',
        senderAvatar: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&h=100&fit=crop&auto=format',
        senderType: 'venue',
        messageType: 'general'
      }
    ],
    lastMessage: {
      id: '4-3',
      content: 'That means a lot! Tonight we have Marcus Miller performing at 9pm - hope to see you there! 🎵',
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      senderId: 'venue-4',
      senderName: 'Blue Note Jazz Club',
      senderAvatar: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&h=100&fit=crop&auto=format',
      senderType: 'venue',
      messageType: 'general'
    }
  },
  {
    id: '5',
    venueId: 'venue-5',
    venueName: 'Momofuku Noodle Bar',
    venueAvatar: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100&h=100&fit=crop&auto=format',
    venueType: 'Restaurant',
    unreadCount: 1,
    isActive: true,
    responseTime: 'Usually responds within 45 minutes',
    messages: [
      {
        id: '5-1',
        content: 'Your table for tonight at 8pm is confirmed! Just a heads up - we\'re featuring a special omakase menu tonight that pairs perfectly with our sake selection 🍜',
        timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
        senderId: 'venue-5',
        senderName: 'Momofuku Noodle Bar',
        senderAvatar: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100&h=100&fit=crop&auto=format',
        senderType: 'venue',
        messageType: 'reservation'
      }
    ],
    lastMessage: {
      id: '5-1',
      content: 'Your table for tonight at 8pm is confirmed! Just a heads up - we\'re featuring a special omakase menu tonight that pairs perfectly with our sake selection 🍜',
      timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
      senderId: 'venue-5',
      senderName: 'Momofuku Noodle Bar',
      senderAvatar: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100&h=100&fit=crop&auto=format',
      senderType: 'venue',
      messageType: 'reservation'
    }
  },
  {
    id: '6',
    venueId: 'venue-6',
    venueName: 'SoulCycle Union Square',
    venueAvatar: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=100&h=100&fit=crop&auto=format',
    venueType: 'Fitness',
    unreadCount: 0,
    isActive: true,
    responseTime: 'Usually responds within 20 minutes',
    messages: [
      {
        id: '6-1',
        content: 'Thanks for booking! Small class tonight so you\'ll get extra attention. Don\'t forget your cycling shoes and we have towels waiting for you 🚴‍♀️',
        timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
        senderId: 'venue-6',
        senderName: 'SoulCycle Union Square',
        senderAvatar: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=100&h=100&fit=crop&auto=format',
        senderType: 'venue',
        messageType: 'class'
      },
      {
        id: '6-2',
        content: 'Perfect! See you at 7pm',
        timestamp: new Date(Date.now() - 1000 * 60 * 85).toISOString(),
        senderId: 'current-user',
        senderName: 'You',
        senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&auto=format',
        senderType: 'user'
      }
    ],
    lastMessage: {
      id: '6-2',
      content: 'Perfect! See you at 7pm',
      timestamp: new Date(Date.now() - 1000 * 60 * 85).toISOString(),
      senderId: 'current-user',
      senderName: 'You',
      senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&auto=format',
      senderType: 'user'
    }
  }
];
