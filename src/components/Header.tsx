
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useIsMobile } from "@/hooks/use-mobile";
import UserPoints from "@/components/UserPoints";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { User, Bookmark, MapPin, Award, UserCircle, LogIn, Settings, Mail, GithubIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { AuthDialog } from "@/components/AuthDialog";

// Array of V-words to cycle through
const vWords = ["Vibe", "Vacation", "Vlog", "Visit", "Voyage", "Venture"];

const Header = () => {
  const isMobile = useIsMobile();
  const [currentVWord, setCurrentVWord] = useState(vWords[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      
      // Wait for exit animation to complete before changing word
      setTimeout(() => {
        setCurrentVWord(prevWord => {
          const currentIndex = vWords.indexOf(prevWord);
          const nextIndex = (currentIndex + 1) % vWords.length;
          return vWords[nextIndex];
        });
      }, 500); // Half the animation duration
      
      // Reset animation state after full animation cycle
      setTimeout(() => {
        setIsAnimating(false);
      }, 1000); // Full animation duration
      
    }, 4000); // Change word every 4 seconds
    
    return () => clearInterval(interval);
  }, []);

  const handleOpenAuth = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setShowAuthDialog(true);
  };

  return (
    <>
      <header className="sticky top-0 z-20 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold relative overflow-hidden">
                <span className={`inline-block transition-transform duration-500 ease-in-out ${isAnimating ? 'transform -translate-y-full opacity-0' : ''}`}>
                  {currentVWord}
                </span>
                <span className="text-transparent vibe-gradient-text"> Right Now</span>
              </span>
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-end space-x-2">
            <UserPoints />
            <ThemeToggle />

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
                      <span>Sign In</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem onSelect={() => handleOpenAuth('signup')} className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Sign Up</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem asChild>
                      <Link to="/profile/bio">
                        <User className="mr-2 h-4 w-4" />
                        <span>Bio</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile/places">
                        <MapPin className="mr-2 h-4 w-4" />
                        <span>My Places</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile/pinned">
                        <Bookmark className="mr-2 h-4 w-4" />
                        <span>Pinned</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile/points">
                        <Award className="mr-2 h-4 w-4" />
                        <span>Points</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </nav>
            )}
          </div>
        </div>
      </header>
      
      <AuthDialog 
        open={showAuthDialog} 
        onOpenChange={setShowAuthDialog} 
        mode={authMode} 
        onModeChange={setAuthMode} 
      />
    </>
  );
};

export default Header;
