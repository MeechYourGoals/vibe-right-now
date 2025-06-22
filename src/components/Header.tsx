
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
import { User, Bookmark, MapPin, Award, UserCircle, LogIn, Settings, BarChart, Headphones, Megaphone, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { AuthDialog } from "@/components/AuthDialog";
import VernonConciergeDialog from "./VernonConcierge/VernonConciergeDialog";

// Expanded array of V-words to cycle through including all the requested ones
const vWords = ["Vibe", "Vacation", "Vlog", "Visit", "Voyage", "View", "Venture", "Value", "Viral"];

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

  const handleOpenAuth = () => {
    setShowAuthDialog(true);
  };

  return (
    <>
      <header className="fixed top-0 z-[9999] w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <Link to="/" className="flex items-center space-x-2">
              <span className={`text-xl font-bold ${isMobile ? 'text-sm' : ''}`}>
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
                      My VRN
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-background border z-50">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem onSelect={handleOpenAuth} className="cursor-pointer">
                      <LogIn className="mr-2 h-4 w-4" />
                      <span>Sign In / Sign Up</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem asChild>
                      <Link to="/profile">
                        <User className="mr-2 h-4 w-4" />
                        <span>My Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/my-places">
                        <MapPin className="mr-2 h-4 w-4" />
                        <span>My Places</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/messages">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>Messages</span>
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
                    <DropdownMenuItem asChild>
                      <Link to="/advertiser-hub">
                        <Megaphone className="mr-2 h-4 w-4" />
                        <span>Advertiser Hub</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </nav>
            )}
            
            {/* For mobile, we'll just keep a minimal header with logo and user points */}
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
