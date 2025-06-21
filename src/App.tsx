
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import VernonNext from '@/components/VernonNext';
import { Auth0Provider } from "./auth/Auth0Provider";

// Lazy-loaded components
const Index = lazy(() => import("@/pages/Index"));
const Explore = lazy(() => import("@/pages/Explore"));
const MyPlaces = lazy(() => import("@/pages/MyPlaces"));
const Settings = lazy(() => import("@/pages/Settings"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const UserPoints = lazy(() => import("@/pages/UserPoints"));
const PinnedVibes = lazy(() => import("@/pages/PinnedVibes"));
const VenueProfile = lazy(() => import("@/pages/VenueProfile"));
const ProfileBio = lazy(() => import("@/pages/ProfileBio"));
const UserProfile = lazy(() => import("@/pages/UserProfile"));
const DataInsights = lazy(() => import("@/pages/DataInsights"));
const TripDetails = lazy(() => import("@/components/places/TripDetails"));
const Discounts = lazy(() => import("@/pages/Discounts"));
const AdvertiserHub = lazy(() => import("@/pages/AdvertiserHub"));
const VenueMessaging = lazy(() => import("@/components/messaging/VenueMessaging"));
const Messages = lazy(() => import("@/pages/Messages"));

function App() {
  // Add a useEffect to handle mobile view adjustments
  useEffect(() => {
    // Set viewport meta tag to ensure proper scaling on mobile devices
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      viewportMeta.setAttribute(
        'content',
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
      );
    }
    
    // Add a class to the body for mobile-specific styling if needed
    const handleResize = () => {
      if (window.innerWidth < 768) {
        document.body.classList.add('is-mobile');
      } else {
        document.body.classList.remove('is-mobile');
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Auth0Provider>
      <ThemeProvider defaultTheme="light" storageKey="vibe-ui-theme">
        <BrowserRouter>
          <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/explore/:city" element={<Explore />} />
              <Route path="/my-places" element={<MyPlaces />} />
              <Route path="/my-places/trip/:tripId" element={<TripDetails />} />
              <Route path="/trip/:tripId" element={<TripDetails />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/points" element={<UserPoints />} />
              <Route path="/pinned" element={<PinnedVibes />} />
              <Route path="/venue/:id" element={<VenueProfile />} />
              <Route path="/profile" element={<ProfileBio />} />
              <Route path="/user/:username" element={<UserProfile />} />
              <Route path="/data-insights" element={<DataInsights />} />
              <Route path="/advertiser-hub" element={<AdvertiserHub />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/mcp-callback" element={<div>Processing authentication...</div>} />
              <Route path="/discounts" element={<Discounts />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <VernonNext />
          <Toaster />
        </BrowserRouter>
      </ThemeProvider>
    </Auth0Provider>
  );
}

export default App;
