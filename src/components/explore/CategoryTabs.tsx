
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Music, Mic, Moon, Calendar } from "lucide-react";

interface CategoryTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  vibeFilters?: string[]; // Add vibe filters to intelligently show/hide tabs
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ activeTab, onTabChange, vibeFilters = [] }) => {
  // Map vibes to suggested categories
  const getRelevantTabs = () => {
    if (vibeFilters.length === 0) {
      return ["all", "restaurant", "bar", "event", "attraction", "sports", "music", "comedy", "nightlife", "other"];
    }

    const vibeToCategories: Record<string, string[]> = {
      "romantic": ["restaurant", "bar"],
      "family friendly": ["restaurant", "attraction", "event"],
      "nightowl": ["bar", "nightlife", "music"],
      "trendy": ["bar", "restaurant", "music"],
      "upscale": ["restaurant", "bar"],
      "casual": ["restaurant", "bar", "attraction"],
      "lively": ["bar", "music", "nightlife", "sports"],
      "energetic": ["sports", "music", "nightlife"],
      "cultural": ["attraction", "event"],
      "cozy": ["restaurant", "bar"]
    };

    const suggestedCategories = new Set<string>(["all"]);
    
    vibeFilters.forEach(vibe => {
      const categories = vibeToCategories[vibe.toLowerCase()] || [];
      categories.forEach(cat => suggestedCategories.add(cat));
    });

    return Array.from(suggestedCategories);
  };

  const relevantTabs = getRelevantTabs();

  return (
    <Tabs defaultValue="all" value={activeTab} onValueChange={onTabChange} className="max-w-4xl mx-auto">
      <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10">
        {relevantTabs.includes("all") && <TabsTrigger value="all">All</TabsTrigger>}
        {relevantTabs.includes("restaurant") && <TabsTrigger value="restaurant">Restaurants</TabsTrigger>}
        {relevantTabs.includes("bar") && <TabsTrigger value="bar">Bars</TabsTrigger>}
        {relevantTabs.includes("event") && <TabsTrigger value="event">Events</TabsTrigger>}
        {relevantTabs.includes("attraction") && <TabsTrigger value="attraction">Attractions</TabsTrigger>}
        {relevantTabs.includes("sports") && <TabsTrigger value="sports">Sports</TabsTrigger>}
        {relevantTabs.includes("music") && (
          <TabsTrigger value="music">
            <Music className="mr-1 h-4 w-4" />
            Music
          </TabsTrigger>
        )}
        {relevantTabs.includes("comedy") && (
          <TabsTrigger value="comedy">
            <Mic className="mr-1 h-4 w-4" />
            Comedy
          </TabsTrigger>
        )}
        {relevantTabs.includes("nightlife") && (
          <TabsTrigger value="nightlife">
            <Moon className="mr-1 h-4 w-4" />
            Nightlife
          </TabsTrigger>
        )}
        {relevantTabs.includes("other") && <TabsTrigger value="other">Other</TabsTrigger>}
      </TabsList>
    </Tabs>
  );
};

export default CategoryTabs;
