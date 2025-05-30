
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Auth0Provider } from '@auth0/auth0-react';
import { auth0Config } from '@/auth/auth0-config';
import Index from "@/pages/Index";
import Explore from "@/pages/Explore";
import UserProfile from "@/pages/UserProfile";
import VenueProfile from "@/pages/VenueProfile";
import ProfileBio from "@/pages/ProfileBio";
import MyPlaces from "@/pages/MyPlaces";
import PinnedVibes from "@/pages/PinnedVibes";
import UserPoints from "@/pages/UserPoints";
import Settings from "@/pages/Settings";
import DataInsights from "@/pages/DataInsights";
import Advertiser from "@/pages/Advertiser";
import Discounts from "@/pages/Discounts";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <Auth0Provider {...auth0Config}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/user/:username" element={<UserProfile />} />
                <Route path="/venue/:venueId" element={<VenueProfile />} />
                <Route path="/profile" element={<ProfileBio />} />
                <Route path="/my-places" element={<MyPlaces />} />
                <Route path="/pinned" element={<PinnedVibes />} />
                <Route path="/points" element={<UserPoints />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/data-insights" element={<DataInsights />} />
                <Route path="/advertiser" element={<Advertiser />} />
                <Route path="/discounts" element={<Discounts />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Auth0Provider>
  );
}

export default App;
