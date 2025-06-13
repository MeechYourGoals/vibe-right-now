
import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Home, Search, MapPin, User, Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileProfileMenu from "./mobile/MobileProfileMenu";
import { Button } from "./ui/button";

const BottomNavbar = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  if (!isMobile) {
    return null;
  }

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="flex items-center justify-around h-16">
        <Link to="/" className={`flex flex-col items-center justify-center w-full h-full ${isActive('/') ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        <Link to="/explore" className={`flex flex-col items-center justify-center w-full h-full ${isActive('/explore') ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
          <Search className="h-5 w-5" />
          <span className="text-xs mt-1">Explore</span>
        </Link>
        
        <Link to="/my-places" className={`flex flex-col items-center justify-center w-full h-full ${isActive('/my-places') ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
          <MapPin className="h-5 w-5" />
          <span className="text-xs mt-1">Places</span>
        </Link>
        
        <Link to="/profile" className={`flex flex-col items-center justify-center w-full h-full ${isActive('/profile') ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Profile</span>
        </Link>

        <MobileProfileMenu 
          isOpen={isProfileMenuOpen} 
          onOpenChange={setIsProfileMenuOpen}
        >
          <Button 
            variant="ghost" 
            className="flex flex-col items-center justify-center w-full h-full text-muted-foreground hover:text-primary p-0"
          >
            <Menu className="h-5 w-5" />
            <span className="text-xs mt-1">More</span>
          </Button>
        </MobileProfileMenu>
      </div>
    </nav>
  );
};

export default BottomNavbar;
