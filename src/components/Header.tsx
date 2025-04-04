
import { useState } from "react";
import { Bell, Menu, Search, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // In a full implementation, this would trigger a search
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b glass-effect backdrop-blur">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center">
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="glass-effect w-[250px] sm:w-[300px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <a href="/" className="text-lg font-medium">Home</a>
                  <a href="/explore" className="text-lg font-medium">Explore</a>
                  <a href="/profile" className="text-lg font-medium">Profile</a>
                  <a href="/post" className="text-lg font-medium">Post</a>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t">
                    <span className="text-sm font-medium">Theme</span>
                    <ThemeToggle />
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          )}
          
          <a href="/" className="flex items-center">
            <span className="text-2xl font-bold mr-1 vibe-gradient-text">Vibe</span>
            <span className="text-2xl font-bold">Right Now</span>
          </a>
        </div>

        {!isMobile && (
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/" className="font-medium hover:text-primary">Home</a>
            <a href="/explore" className="font-medium hover:text-primary">Explore</a>
          </nav>
        )}

        <form onSubmit={handleSearch} className="hidden md:flex relative w-full max-w-sm mx-4">
          <Input
            type="search"
            placeholder="Search locations, events..."
            className="pr-10 glass-effect"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button 
            type="submit" 
            variant="ghost" 
            size="icon" 
            className="absolute right-0 top-0"
          >
            <Search className="h-4 w-4" />
          </Button>
        </form>

        <div className="flex items-center gap-2">
          {isMobile && (
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Sparkles className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]">
                    24
                  </Badge>
                  <span className="sr-only">Points</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>You have 24 reward points</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Notifications</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Check your notifications</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">Profile</span>
          </Button>

          {!isMobile && <ThemeToggle />}

          {!isMobile && (
            <Button asChild variant="default" className="bg-gradient-vibe">
              <a href="/post">Post a Vibe</a>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
