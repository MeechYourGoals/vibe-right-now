
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemeProvider";

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

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vibe-theme">
      <BrowserRouter>
        <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/explore/:city" element={<Explore />} />
            <Route path="/my-places" element={<MyPlaces />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/points" element={<UserPoints />} />
            <Route path="/pinned" element={<PinnedVibes />} />
            <Route path="/venue/:id" element={<VenueProfile />} />
            <Route path="/profile" element={<ProfileBio />} />
            <Route path="/user/:username" element={<UserProfile />} />
            <Route path="/data-insights" element={<DataInsights />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
