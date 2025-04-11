
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Index"; // Changed from "@/pages/Home"
import Explore from "@/pages/Explore";
import Profile from "@/pages/ProfileBio"; // Changed from "@/pages/Profile"
import MyPlaces from "@/pages/MyPlaces";
import Pinned from "@/pages/PinnedVibes"; // Changed from "@/pages/Pinned"
import Points from "@/pages/UserPoints"; // Changed from "@/pages/Points"
import Settings from "@/pages/Settings";
import VenueProfile from "@/pages/VenueProfile";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import VernonChat from "@/components/VernonChat";
import CameraButton from "@/components/CameraButton";
import LocationSearch from "@/components/LocationSearch"; // Added back now that we've created the component

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vibe-ui-theme">
      <BrowserRouter>
        <div className="min-h-screen bg-background text-foreground">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-places" element={<MyPlaces />} />
            <Route path="/pinned" element={<Pinned />} />
            <Route path="/points" element={<Points />} />
            <Route path="/settings/*" element={<Settings />} />
            <Route path="/venue/:id" element={<VenueProfile />} />
          </Routes>
          <VernonChat />
          <CameraButton />
          <LocationSearch />
          <Toaster />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
