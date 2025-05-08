
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Music, Mic, Moon, Calendar } from "lucide-react";

interface CategoryTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <Tabs defaultValue="all" value={activeTab} onValueChange={onTabChange} className="max-w-4xl mx-auto">
      <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="restaurant">Restaurants</TabsTrigger>
        <TabsTrigger value="bar">Bars</TabsTrigger>
        <TabsTrigger value="event">Events</TabsTrigger>
        <TabsTrigger value="attraction">Attractions</TabsTrigger>
        <TabsTrigger value="sports">Sports</TabsTrigger>
        <TabsTrigger value="music">
          <Music className="mr-1 h-4 w-4" />
          Music
        </TabsTrigger>
        <TabsTrigger value="comedy">
          <Mic className="mr-1 h-4 w-4" />
          Comedy
        </TabsTrigger>
        <TabsTrigger value="nightlife">
          <Moon className="mr-1 h-4 w-4" />
          Nightlife
        </TabsTrigger>
        <TabsTrigger value="other">Other</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default CategoryTabs;
