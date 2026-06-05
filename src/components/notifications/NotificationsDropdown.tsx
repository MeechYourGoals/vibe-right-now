
import React, { useCallback, useEffect, useState } from 'react';
import {
  Bell,
  Music,
  Ticket,
  Gift,
  MapPin,
  Car,
  Award,
  CreditCard,
  Building,
  Info,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
import { notificationsRepo } from "@/services/data";
import type { AppNotification } from "@/services/data";
import { useUserStore } from "@/store";

/** Demo fallback notifications used when signed out / DB empty so the panel never looks broken. */
const FALLBACK_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'demo-1',
    type: 'event',
    title: 'Drake is performing near you',
    body: 'Drake is live at SoFi Stadium this weekend!',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: 'demo-2',
    type: 'reward',
    title: 'Redeem your VRN points',
    body: 'You have enough points for a free coffee at Artisan Bakery',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: 'demo-3',
    type: 'discount',
    title: "15% off at Mama's Fish Grill",
    body: 'Use your VRN QR code in Apple Wallet to get 15% off',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: 'demo-4',
    type: 'social',
    title: 'Sunset Lounge pinned your post',
    body: 'Your vibe at Sunset Lounge was pinned to their profile',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: 'demo-5',
    type: 'trip',
    title: 'Trip booked!',
    body: 'Your Vernon Concierge Trip is now booked',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
];

function iconForType(type: string): React.ReactNode {
  switch (type) {
    case 'event':
      return <Ticket className="h-4 w-4 text-blue-500" />;
    case 'reward':
      return <Gift className="h-4 w-4 text-amber-500" />;
    case 'discount':
      return <CreditCard className="h-4 w-4 text-green-500" />;
    case 'social':
      return <MapPin className="h-4 w-4 text-red-500" />;
    case 'offer':
      return <Award className="h-4 w-4 text-indigo-500" />;
    case 'trip':
      return <Building className="h-4 w-4 text-teal-500" />;
    case 'connection':
      return <Car className="h-4 w-4 text-slate-500" />;
    case 'music':
      return <Music className="h-4 w-4 text-purple-500" />;
    default:
      return <Info className="h-4 w-4 text-muted-foreground" />;
  }
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return `${Math.round(days / 7)}w ago`;
}

const NotificationsDropdown = () => {
  const { user, isAuthenticated } = useUserStore();
  const userId = user?.id ?? null;
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [usingFallback, setUsingFallback] = useState(false);

  const load = useCallback(async () => {
    let list: AppNotification[] = [];
    try {
      if (userId) {
        list = await notificationsRepo.list(userId);
      }
    } catch (err) {
      console.warn('[NotificationsDropdown] list failed', err);
    }
    if (!list || list.length === 0) {
      setNotifications(FALLBACK_NOTIFICATIONS);
      setUsingFallback(true);
    } else {
      setNotifications(list);
      setUsingFallback(false);
    }
  }, [userId]);

  useEffect(() => {
    load();
  }, [load]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = useCallback(
    async (id: string) => {
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
      if (!usingFallback && userId) {
        try {
          await notificationsRepo.markRead(id);
        } catch (err) {
          console.warn('[NotificationsDropdown] markRead failed', err);
        }
      }
    },
    [usingFallback, userId],
  );

  const markAllAsRead = useCallback(async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    if (!usingFallback && userId) {
      try {
        await notificationsRepo.markAllRead(userId);
      } catch (err) {
        console.warn('[NotificationsDropdown] markAllRead failed', err);
      }
    }
  }, [usingFallback, userId]);

  const handleNotificationClick = useCallback(
    (n: AppNotification) => {
      markAsRead(n.id);
      if (n.link) navigate(n.link);
    },
    [markAsRead, navigate],
  );

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
                  onSelect={(e) => {
                    e.preventDefault();
                    handleNotificationClick(notification);
                  }}
                >
                  <div className="mt-0.5">{iconForType(notification.type)}</div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{notification.title}</p>
                    {notification.body && (
                      <p className="text-xs text-muted-foreground">{notification.body}</p>
                    )}
                    <p className="text-xs text-muted-foreground/70">
                      {relativeTime(notification.createdAt)}
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

        {!isAuthenticated && (
          <>
            <DropdownMenuSeparator />
            <p className="px-3 py-2 text-xs text-muted-foreground">
              Sign in to see your real notifications.
            </p>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsDropdown;
