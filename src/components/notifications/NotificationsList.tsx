
import React from 'react';
import { DropdownMenuGroup } from "@/components/ui/dropdown-menu";
import { Notification } from './types';
import NotificationItem from './NotificationItem';

interface NotificationsListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
}

const NotificationsList: React.FC<NotificationsListProps> = ({
  notifications,
  onMarkAsRead
}) => {
  if (notifications.length === 0) {
    return (
      <div className="py-6 text-center text-sm text-muted-foreground">
        No notifications
      </div>
    );
  }

  return (
    <DropdownMenuGroup>
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onMarkAsRead={onMarkAsRead}
        />
      ))}
    </DropdownMenuGroup>
  );
};

export default NotificationsList;
