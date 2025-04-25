
import { auth, db } from '@/firebase/config';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { httpsCallable } from 'firebase/functions';
import { functions } from '@/firebase/config';
import { doc, setDoc, deleteDoc, collection } from 'firebase/firestore';

class FCMService {
  private messaging: any = null;
  private initialized = false;

  async init() {
    try {
      if (!this.initialized) {
        // Import messaging dynamically to avoid SSR issues
        const { getMessaging } = await import('firebase/messaging');
        this.messaging = getMessaging();
        this.initialized = true;
        console.log('FCM initialized successfully');
      }
    } catch (error) {
      console.error('Failed to initialize FCM:', error);
    }
  }

  async requestPermission() {
    try {
      await this.init();
      
      // Request notification permission
      const permission = await Notification.requestPermission();
      
      if (permission === 'granted') {
        return await this.getToken();
      } else {
        console.log('Notification permission denied');
        return null;
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return null;
    }
  }

  async getToken() {
    try {
      await this.init();
      
      // Get FCM token
      const vapidKey = 'YOUR_VAPID_KEY'; // Replace with your VAPID key from Firebase console
      const token = await getToken(this.messaging, { vapidKey });
      
      if (token) {
        console.log('FCM token:', token);
        await this.saveToken(token);
        return token;
      } else {
        console.log('No registration token available');
        return null;
      }
    } catch (error) {
      console.error('Error getting FCM token:', error);
      return null;
    }
  }

  async saveToken(token: string) {
    try {
      const user = auth.currentUser;
      
      if (user) {
        const tokenRef = doc(collection(db, 'users', user.uid, 'fcmTokens'), token);
        await setDoc(tokenRef, {
          token,
          createdAt: new Date(),
          platform: this.getPlatform(),
          userAgent: navigator.userAgent
        });
        
        console.log('FCM token saved to database');
      }
    } catch (error) {
      console.error('Error saving FCM token:', error);
    }
  }

  async deleteToken(token: string) {
    try {
      const user = auth.currentUser;
      
      if (user) {
        const tokenRef = doc(collection(db, 'users', user.uid, 'fcmTokens'), token);
        await deleteDoc(tokenRef);
        
        console.log('FCM token deleted from database');
      }
    } catch (error) {
      console.error('Error deleting FCM token:', error);
    }
  }

  onMessage(callback: (payload: any) => void) {
    try {
      if (!this.initialized) {
        this.init().then(() => {
          onMessage(this.messaging, callback);
        });
      } else {
        onMessage(this.messaging, callback);
      }
    } catch (error) {
      console.error('Error setting up FCM message handler:', error);
    }
  }

  // Send FCM message to a specific topic
  async sendToTopic(topic: string, title: string, body: string, data?: Record<string, string>) {
    try {
      const sendToTopicFn = httpsCallable(functions, 'sendFCMToTopic');
      
      return await sendToTopicFn({
        topic,
        message: {
          notification: {
            title,
            body
          },
          data
        }
      });
    } catch (error) {
      console.error('Error sending FCM message to topic:', error);
    }
  }

  // Send FCM message to specific tokens
  async sendToTokens(tokens: string[], title: string, body: string, data?: Record<string, string>) {
    try {
      const sendToTokensFn = httpsCallable(functions, 'sendFCMToTokens');
      
      return await sendToTokensFn({
        tokens,
        message: {
          notification: {
            title,
            body
          },
          data
        }
      });
    } catch (error) {
      console.error('Error sending FCM message to tokens:', error);
    }
  }

  // Get the current platform (browser, iOS, Android)
  private getPlatform() {
    const userAgent = navigator.userAgent || navigator.vendor;
    
    if (/android/i.test(userAgent)) {
      return 'android';
    }
    
    if (/iPad|iPhone|iPod/.test(userAgent)) {
      return 'ios';
    }
    
    return 'web';
  }
}

export const fcmService = new FCMService();
