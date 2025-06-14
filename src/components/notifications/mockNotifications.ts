
import { 
  Music, 
  Gift, 
  CreditCard,
  Ticket, 
  MapPin, 
  Award,
  Building,
  Car,
  MessageCircle
} from 'lucide-react';
import { Notification } from './types';

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New message from LA Tech Week',
    description: 'You have a new message from LA Tech Week regarding exclusive networking events',
    timestamp: '1h ago',
    read: false,
    type: 'message',
    icon: <MessageCircle className="h-4 w-4 text-blue-500" />
  },
  {
    id: '2',
    title: 'Drake is performing near you',
    description: 'Drake is live at SoFi Stadium this weekend!',
    timestamp: '2h ago',
    read: false,
    type: 'event',
    icon: <Music className="h-4 w-4 text-purple-500" />
  },
  {
    id: '3',
    title: 'Redeem your VRN points',
    description: 'You have enough points for a free coffee at Artisan Bakery',
    timestamp: '3h ago',
    read: false,
    type: 'reward',
    icon: <Gift className="h-4 w-4 text-amber-500" />
  },
  {
    id: '4',
    title: '15% off at Mama\'s Fish Grill',
    description: 'Use your VRN QR code in Apple Wallet to get 15% off',
    timestamp: '5h ago',
    read: false,
    type: 'discount',
    icon: <CreditCard className="h-4 w-4 text-green-500" />
  },
  {
    id: '5',
    title: 'Clippers vs Lakers',
    description: 'The Clippers are playing this week at Intuit Dome',
    timestamp: '1d ago',
    read: true,
    type: 'event',
    icon: <Ticket className="h-4 w-4 text-blue-500" />
  },
  {
    id: '6',
    title: 'Sunset Lounge pinned your post',
    description: 'Your vibe at Sunset Lounge was pinned to their profile',
    timestamp: '2d ago',
    read: true,
    type: 'social',
    icon: <MapPin className="h-4 w-4 text-red-500" />
  },
  {
    id: '7',
    title: 'New influencer offers',
    description: 'You have 3 offers in the VRN Influencer marketplace',
    timestamp: '3d ago',
    read: true,
    type: 'offer',
    icon: <Award className="h-4 w-4 text-indigo-500" />
  },
  {
    id: '8',
    title: 'Trip booked!',
    description: 'Your Vernon Concierge Trip is now booked',
    timestamp: '1w ago',
    read: true,
    type: 'trip',
    icon: <Building className="h-4 w-4 text-teal-500" />
  },
  {
    id: '9',
    title: 'Uber Eats connected',
    description: 'Your Uber Eats account is now connected',
    timestamp: '1w ago',
    read: true,
    type: 'connection',
    icon: <Car className="h-4 w-4 text-slate-500" />
  }
];
