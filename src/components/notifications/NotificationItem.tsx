
import React from 'react';
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Notification } from './types';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead
}) => {
  return (
    <DropdownMenuItem 
      className={`flex items-start p-3 gap-3 cursor-pointer ${notification.read ? '' : 'bg-muted/50'}`}
      onClick={() => onMarkAsRead(notification.id)}
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
  );
};

export default NotificationItem;
