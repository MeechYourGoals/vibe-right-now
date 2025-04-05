
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import VenueProfile from "./pages/VenueProfile";
import NotFound from "./pages/NotFound";
import ProfileBio from "./pages/ProfileBio";
import MyPlaces from "./pages/MyPlaces";
import PinnedVibes from "./pages/PinnedVibes";
import UserPointsPage from "./pages/UserPoints";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="dark">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/venue/:id" element={<VenueProfile />} />
            <Route path="/profile/bio" element={<ProfileBio />} />
            <Route path="/profile/places" element={<MyPlaces />} />
            <Route path="/profile/pinned" element={<PinnedVibes />} />
            <Route path="/profile/points" element={<UserPointsPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
