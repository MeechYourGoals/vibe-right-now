
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useIsMobile } from "@/hooks/use-mobile";
import UserPoints from "@/components/user-points";
import NotificationsDropdown from "@/components/notifications/NotificationsDropdown";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { User, Bell, Globe, Shield, PaintBucket, MessageSquare, Search, LogIn, Settings, MapPin, Bookmark, Award, UserCircle, BarChart, Headphones } from "lucide-react";
import { useEffect, useState } from "react";
import { AuthDialog } from "@/components/AuthDialog";
import VernonConciergeDialog from "./VernonConcierge/VernonConciergeDialog";

// Array of V-words to cycle through
const vWords = ["Vibe", "Vacation", "Vlog", "Visit", "Voyage", "Venture"];

const Header = () => {
  const isMobile = useIsMobile();
  const [currentVWord, setCurrentVWord] = useState(vWords[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showConciergeDialog, setShowConciergeDialog] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      
      // Wait for fade-out to complete before changing word
      setTimeout(() => {
        setCurrentVWord(prevWord => {
          const currentIndex = vWords.indexOf(prevWord);
          const nextIndex = (currentIndex + 1) % vWords.length;
          return vWords[nextIndex];
        });
        
        // Reset animation state for fade-in
        setIsAnimating(false);
      }, 500); // Half a second for transition
      
    }, 5000); // Change word every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  const handleOpenAuth = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setShowAuthDialog(true);
  };

  return (
    <>
      <header className="fixed top-0 z-[9999] w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">
                <span className={`inline-block vibe-gradient-text transition-opacity duration-500 ease-in-out ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                  {currentVWord}
                </span>
                <span className="vibe-gradient-text"> Right Now</span>
              </span>
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-end space-x-2">
            <UserPoints />
            <NotificationsDropdown />

            {!isMobile && (
              <nav className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/">Home</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link to="/explore">Explore</Link>
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-1">
                      <UserCircle className="h-4 w-4 mr-1" />
                      My Profile
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem onSelect={() => handleOpenAuth('signin')} className="cursor-pointer">
                      <LogIn className="mr-2 h-4 w-4" />
                      <span>Sign In/Up</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem asChild>
                      <Link to="/profile">
                        <User className="mr-2 h-4 w-4" />
                        <span>Bio</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/my-places">
                        <MapPin className="mr-2 h-4 w-4" />
                        <span>My Places</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/pinned">
                        <Bookmark className="mr-2 h-4 w-4" />
                        <span>Pinned</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/points">
                        <Award className="mr-2 h-4 w-4" />
                        <span>Points</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="cursor-pointer"
                      onSelect={() => setShowConciergeDialog(true)}
                    >
                      <Headphones className="mr-2 h-4 w-4" />
                      <span>Vernon Concierge</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/data-insights">
                        <BarChart className="mr-2 h-4 w-4" />
                        <span>Data Insights</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </nav>
            )}
          </div>
        </div>
      </header>
      
      <div className="h-16"></div> {/* Spacer to prevent content from being hidden under fixed header */}
      
      <AuthDialog 
        open={showAuthDialog} 
        onOpenChange={setShowAuthDialog} 
        mode={authMode} 
        onModeChange={setAuthMode} 
      />

      <VernonConciergeDialog
        open={showConciergeDialog}
        onOpenChange={setShowConciergeDialog}
      />
    </>
  );
};

export default Header;
