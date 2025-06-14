import React, { useState } from 'react';
import { 
  Bell, 
  Music, 
  Ticket, 
  Gift, 
  ShoppingBag, 
  MessageSquarePlus, 
  MapPin, 
  Car, 
  Award,
  CreditCard,
  Building,
  MessageCircle
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  type: 'event' | 'reward' | 'discount' | 'social' | 'trip' | 'connection' | 'offer' | 'message';
  icon: React.ReactNode;
}

const NotificationsDropdown = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
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
  ]);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-[1.2rem] w-[1.2rem]" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px]"
            >
              {unreadCount}
            </Badge>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs h-6 px-2"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <div className="max-h-80 overflow-y-auto">
          <DropdownMenuGroup>
            {notifications.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <DropdownMenuItem 
                  key={notification.id} 
                  className={`flex items-start p-3 gap-3 cursor-pointer ${notification.read ? '' : 'bg-muted/50'}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="mt-0.5">
                    {notification.icon}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {notification.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {notification.description}
                    </p>
                    <p className="text-xs text-muted-foreground/70">
                      {notification.timestamp}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="h-2 w-2 rounded-full bg-primary mt-1"></div>
                  )}
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuGroup>
        </div>
        
        <DropdownMenuSeparator />
        <div className="p-2">
          <Button variant="outline" size="sm" className="w-full">
            View all notifications
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsDropdown;
