
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useIsMobile } from "@/hooks/use-mobile";
import UserPoints from "@/components/UserPoints";

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
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
