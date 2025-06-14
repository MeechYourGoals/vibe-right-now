
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface MessageTypeBadgeProps {
  type?: 'promotional' | 'reservation' | 'loyalty' | 'general' | 'class' | 'bottle_service';
}

const MessageTypeBadge: React.FC<MessageTypeBadgeProps> = ({ type }) => {
  if (!type) return null;

  const getBadgeConfig = (messageType: string) => {
    switch (messageType) {
      case 'promotional':
        return { label: 'Promo', className: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300' };
      case 'reservation':
        return { label: 'Reservation', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' };
      case 'loyalty':
        return { label: 'Loyalty', className: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300' };
      case 'class':
        return { label: 'Class Info', className: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' };
      case 'bottle_service':
        return { label: 'VIP Offer', className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' };
      default:
        return { label: 'General', className: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300' };
    }
  };

  const config = getBadgeConfig(type);

  return (
    <Badge variant="secondary" className={`text-xs ${config.className}`}>
      {config.label}
    </Badge>
  );
};

export default MessageTypeBadge;
