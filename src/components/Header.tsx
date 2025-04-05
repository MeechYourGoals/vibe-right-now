
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
import { User, Bookmark, MapPin, Award, UserCircle } from "lucide-react";

const Header = () => {
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-20 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold vibe-gradient-text">
              Vibe Right Now
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
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Bio</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>My Places</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bookmark className="mr-2 h-4 w-4" />
                    <span>Pinned</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Award className="mr-2 h-4 w-4" />
                    <span>Points</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <span>Settings</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
