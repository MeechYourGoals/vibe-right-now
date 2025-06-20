
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Music, Mic, Moon } from "lucide-react";

interface CategoryTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <Tabs defaultValue="all" value={activeTab} onValueChange={onTabChange} className="max-w-4xl mx-auto">
      <TabsList className="w-full overflow-x-auto scrollbar-none">
        <div className="flex flex-nowrap gap-1 min-w-max px-1">
          <TabsTrigger value="all" className="whitespace-nowrap flex-shrink-0">All</TabsTrigger>
          <TabsTrigger value="restaurant" className="whitespace-nowrap flex-shrink-0">
            <span className="hidden sm:inline">Restaurants</span>
            <span className="sm:hidden">Food</span>
          </TabsTrigger>
          <TabsTrigger value="bar" className="whitespace-nowrap flex-shrink-0">Bars</TabsTrigger>
          <TabsTrigger value="event" className="whitespace-nowrap flex-shrink-0">Events</TabsTrigger>
          <TabsTrigger value="attraction" className="whitespace-nowrap flex-shrink-0">
            <span className="hidden sm:inline">Attractions</span>
            <span className="sm:hidden">Attract</span>
          </TabsTrigger>
          <TabsTrigger value="sports" className="whitespace-nowrap flex-shrink-0">Sports</TabsTrigger>
          <TabsTrigger value="music" className="flex items-center gap-1 whitespace-nowrap flex-shrink-0">
            <Music className="h-4 w-4" />
            <span>Music</span>
          </TabsTrigger>
          <TabsTrigger value="comedy" className="flex items-center gap-1 whitespace-nowrap flex-shrink-0">
            <Mic className="h-4 w-4" />
            <span>Comedy</span>
          </TabsTrigger>
          <TabsTrigger value="nightlife" className="flex items-center gap-1 whitespace-nowrap flex-shrink-0">
            <Moon className="h-4 w-4" />
            <span className="hidden sm:inline">Nightlife</span>
            <span className="sm:hidden">Night</span>
          </TabsTrigger>
          <TabsTrigger value="other" className="whitespace-nowrap flex-shrink-0">Other</TabsTrigger>
        </div>
      </TabsList>
    </Tabs>
  );
};

export default CategoryTabs;
