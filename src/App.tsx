
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/ThemeProvider';
import Index from '@/pages/Index';
import Explore from '@/pages/Explore';
import UserProfile from '@/pages/UserProfile';
import VenueProfile from '@/pages/VenueProfile';
import Settings from '@/pages/Settings';
import Discounts from '@/pages/Discounts';
import DataInsights from '@/pages/DataInsights';
import AdvertiserHub from '@/pages/AdvertiserHub';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Router>
          <div className="min-h-screen bg-background">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/profile/:username" element={<UserProfile />} />
              <Route path="/venue/:venueId" element={<VenueProfile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/discounts" element={<Discounts />} />
              <Route path="/analytics" element={<DataInsights />} />
              <Route path="/advertising" element={<AdvertiserHub />} />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
