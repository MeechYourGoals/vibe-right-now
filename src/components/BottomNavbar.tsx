
import React from 'react';
import { Link } from "react-router-dom";
import { Home, Search, MapPin, User, Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const BottomNavbar = () => {
  const isMobile = useIsMobile();
  
  if (!isMobile) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="flex items-center justify-around h-16">
        <Link to="/" className="flex flex-col items-center justify-center w-full h-full text-muted-foreground hover:text-primary">
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        <Link to="/explore" className="flex flex-col items-center justify-center w-full h-full text-muted-foreground hover:text-primary">
          <Search className="h-5 w-5" />
          <span className="text-xs mt-1">Explore</span>
        </Link>
        
        <Link to="/my-places" className="flex flex-col items-center justify-center w-full h-full text-muted-foreground hover:text-primary">
          <MapPin className="h-5 w-5" />
          <span className="text-xs mt-1">Places</span>
        </Link>
        
        <Link to="/profile" className="flex flex-col items-center justify-center w-full h-full text-muted-foreground hover:text-primary">
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNavbar;
