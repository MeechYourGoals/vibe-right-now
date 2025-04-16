
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.6615c5b793f541b0b3756a37437bdc16',
  appName: 'vibe-right-now',
  webDir: 'dist',
  server: {
    url: 'https://6615c5b7-93f5-41b0-b375-6a37437bdc16.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    contentInset: 'always',
    backgroundColor: '#121212',
    preferredContentMode: 'mobile',
    scheme: 'vibe-right-now',
    limitsNavigationsToAppBoundDomains: true,
  },
  android: {
    backgroundColor: '#121212'
  },
  plugins: {
    // Add this configuration for Auth0 redirects
    CapacitorCustomTabs: {
      allowsThirdPartyCookies: true
    },
    // Handle deep links for Auth0 redirects
    DeepLinks: {
      customScheme: 'vibe-right-now',
      appleTouchIconLink: 'apple-touch-icon.png'
    }
  }
};

export default config;
