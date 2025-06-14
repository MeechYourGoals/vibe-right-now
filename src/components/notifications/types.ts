
import { ReactNode } from 'react';

export interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  type: 'event' | 'reward' | 'discount' | 'social' | 'trip' | 'connection' | 'offer' | 'message';
  icon: ReactNode;
}
