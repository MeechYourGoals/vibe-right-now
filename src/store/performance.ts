
import React from 'react';
import { useAppStore } from './appStore';

// Performance monitoring for store operations
export const storePerformance = {
  // Monitor store size and performance
  getStoreSize: () => {
    const state = useAppStore.getState();
    return {
      messagesCount: state.chatState.messages.length,
      venuesCount: state.venues.length,
      followedVenuesCount: state.followedVenues.length,
      locationsCount: state.locations.length,
      notificationsCount: state.ui.notifications.length,
    };
  },
  
  // Clean up old data to maintain performance
  cleanupOldData: () => {
    const { setMessages, clearNotifications } = useAppStore.getState();
    const state = useAppStore.getState();
    
    // Keep only last 50 messages
    if (state.chatState.messages.length > 50) {
      setMessages(state.chatState.messages.slice(-50));
    }
    
    // Clear old notifications (older than 1 hour)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recentNotifications = state.ui.notifications.filter(
      n => n.timestamp > oneHourAgo
    );
    
    if (recentNotifications.length !== state.ui.notifications.length) {
      clearNotifications();
      recentNotifications.forEach(notification => {
        useAppStore.getState().addNotification({
          type: notification.type,
          title: notification.title,
          message: notification.message,
        });
      });
    }
  },
  
  // Log store performance metrics
  logPerformanceMetrics: () => {
    const metrics = storePerformance.getStoreSize();
    console.log('Store Performance Metrics:', metrics);
    
    // Log warnings for large data sets
    if (metrics.messagesCount > 100) {
      console.warn('Large number of chat messages in store:', metrics.messagesCount);
    }
    
    if (metrics.notificationsCount > 20) {
      console.warn('Large number of notifications in store:', metrics.notificationsCount);
    }
  }
};

// Hook to automatically clean up store data
export const useStoreCleanup = () => {
  React.useEffect(() => {
    const interval = setInterval(() => {
      storePerformance.cleanupOldData();
    }, 5 * 60 * 1000); // Clean up every 5 minutes
    
    return () => clearInterval(interval);
  }, []);
};
