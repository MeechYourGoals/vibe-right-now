
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import MyPlaces from "./pages/MyPlaces";
import PinnedVibes from "./pages/PinnedVibes";
import Discounts from "./pages/Discounts";
import UserPoints from "./pages/UserPoints";
import Settings from "./pages/Settings";
import ProfileBio from "./pages/ProfileBio";
import UserProfile from "./pages/UserProfile";
import VenueProfile from "./pages/VenueProfile";
import DataInsights from "./pages/DataInsights";
import AdvertiserHub from "./pages/AdvertiserHub";
import NotFound from "./pages/NotFound";
import { Auth0Provider } from "./auth/Auth0Provider";

import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Auth0Provider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/my-places" element={<MyPlaces />} />
                <Route path="/pinned-vibes" element={<PinnedVibes />} />
                <Route path="/discounts" element={<Discounts />} />
                <Route path="/user-points" element={<UserPoints />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile-bio" element={<ProfileBio />} />
                <Route path="/user/:username" element={<UserProfile />} />
                <Route path="/venue/:id" element={<VenueProfile />} />
                <Route path="/data-insights" element={<DataInsights />} />
                <Route path="/advertiser-hub" element={<AdvertiserHub />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </Auth0Provider>
    </QueryClientProvider>
  );
}

export default App;
