
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';
import Home from '@/pages/Home';
import Explore from '@/pages/Explore';
import Profile from '@/pages/Profile';
import VenueProfile from '@/pages/VenueProfile';
import Post from '@/pages/Post';
import Settings from '@/pages/Settings';
import Discounts from '@/pages/Discounts';
import Analytics from '@/pages/Analytics';
import AdvertisingSuite from '@/pages/AdvertisingSuite';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Router>
          <div className="min-h-screen bg-background">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/profile/:username" element={<Profile />} />
              <Route path="/venue/:venueId" element={<VenueProfile />} />
              <Route path="/post/:postId" element={<Post />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/discounts" element={<Discounts />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/advertising" element={<AdvertisingSuite />} />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
