
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import MyPlaces from "./pages/MyPlaces";
import PinnedVibes from "./pages/PinnedVibes";
import UserPoints from "./pages/UserPoints";
import Settings from "./pages/Settings";
import DataInsights from "./pages/DataInsights";
import Advertiser from "./pages/Advertiser";
import VenueProfile from "./pages/VenueProfile";
import UserProfile from "./pages/UserProfile";
import ProfileBio from "./pages/ProfileBio";
import Discounts from "./pages/Discounts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/my-places" element={<MyPlaces />} />
              <Route path="/pinned" element={<PinnedVibes />} />
              <Route path="/points" element={<UserPoints />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/data-insights" element={<DataInsights />} />
              <Route path="/advertiser" element={<Advertiser />} />
              <Route path="/venue/:id" element={<VenueProfile />} />
              <Route path="/user/:username" element={<UserProfile />} />
              <Route path="/profile" element={<ProfileBio />} />
              <Route path="/discounts" element={<Discounts />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
