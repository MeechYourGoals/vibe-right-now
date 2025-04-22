
import { getMessaging, getToken, onMessage, Messaging } from 'firebase/messaging';
import { httpsCallable } from 'firebase/functions';
import { functions, db } from '@/firebase/config';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth } from '@/firebase/config';

// FCM Configuration
const PUBLIC_VAPID_KEY = 'YOUR_VAPID_KEY'; // Replace with your VAPID key

// Initialize Firebase Cloud Messaging
let messaging: Messaging | null = null;
try {
  messaging = getMessaging();
} catch (error) {
  console.error('Error initializing FCM:', error);
}

// Request permission and get FCM token
export const requestNotificationPermission = async (): Promise<string | null> => {
  if (!messaging) return null;
  
  try {
    const permission = await Notification.requestPermission();
    
    if (permission === 'granted') {
      // Get FCM token
      const currentToken = await getToken(messaging, { vapidKey: PUBLIC_VAPID_KEY });
      
      if (currentToken) {
        // Store token in Firestore for the current user
        const user = auth.currentUser;
        if (user) {
          await setDoc(
            doc(db, 'users', user.uid),
            {
              fcmTokens: {
                [currentToken]: {
                  createdAt: serverTimestamp(),
                  platform: getPlatform(),
                  deviceInfo: getDeviceInfo()
                }
              }
            },
            { merge: true }
          );
        }
        
        return currentToken;
      } else {
        console.error('No FCM registration token available');
        return null;
      }
    } else {
      console.warn('Notification permission denied');
      return null;
    }
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return null;
  }
};

// Listen for FCM messages
export const setupFCMListeners = (onNotificationReceived: (payload: any) => void): (() => void) => {
  if (!messaging) return () => {};
  
  const unsubscribe = onMessage(messaging, (payload) => {
    console.log('Message received:', payload);
    onNotificationReceived(payload);
    
    // Show notification if app is in foreground
    if (payload.notification) {
      const { title, body } = payload.notification;
      
      if (Notification.permission === 'granted') {
        new Notification(title as string, {
          body: body as string,
          icon: '/logo.png'
        });
      }
    }
  });
  
  return unsubscribe;
};

// Send notification to specific user
export const sendNotificationToUser = async (
  userId: string,
  title: string,
  body: string,
  data: Record<string, string> = {}
): Promise<void> => {
  try {
    const sendNotification = httpsCallable(functions, 'sendNotification');
    await sendNotification({
      userId,
      notification: {
        title,
        body
      },
      data
    });
  } catch (error) {
    console.error('Error sending notification:', error);
    throw error;
  }
};

// Send notification to topic subscribers
export const sendNotificationToTopic = async (
  topic: string,
  title: string,
  body: string,
  data: Record<string, string> = {}
): Promise<void> => {
  try {
    const sendTopicNotification = httpsCallable(functions, 'sendTopicNotification');
    await sendTopicNotification({
      topic,
      notification: {
        title,
        body
      },
      data
    });
  } catch (error) {
    console.error('Error sending topic notification:', error);
    throw error;
  }
};

// Subscribe to a topic
export const subscribeToTopic = async (topic: string): Promise<void> => {
  try {
    const token = await requestNotificationPermission();
    
    if (token) {
      const subscribeTopic = httpsCallable(functions, 'subscribeTopic');
      await subscribeTopic({ token, topic });
    }
  } catch (error) {
    console.error('Error subscribing to topic:', error);
    throw error;
  }
};

// Unsubscribe from a topic
export const unsubscribeFromTopic = async (topic: string): Promise<void> => {
  try {
    const token = await requestNotificationPermission();
    
    if (token) {
      const unsubscribeTopic = httpsCallable(functions, 'unsubscribeTopic');
      await unsubscribeTopic({ token, topic });
    }
  } catch (error) {
    console.error('Error unsubscribing from topic:', error);
    throw error;
  }
};

// Helper functions
const getPlatform = (): string => {
  return navigator.userAgent;
};

const getDeviceInfo = (): object => {
  return {
    language: navigator.language,
    platform: navigator.platform,
    userAgent: navigator.userAgent,
    vendor: navigator.vendor
  };
};
