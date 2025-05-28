
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchVibesProps {
  searchQuery: string;
  selectedCategory: string;
}

const SearchVibes: React.FC<SearchVibesProps> = ({ searchQuery, selectedCategory }) => {
  const trendingVibes = [
    "🔥 Lit", "🎵 Vibes", "💎 Bougie", "🌮 Foodie", "🍸 Classy",
    "🎉 Party", "📸 Aesthetic", "🌃 Chill", "⚡ Electric", "🎭 Artsy"
  ];

  return (
    <Card className="bg-neutral-900 border-neutral-700">
      <CardHeader>
        <CardTitle className="text-white">Search Vibes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
          <Input 
            placeholder="Search for vibes..." 
            className="pl-10 bg-neutral-800 border-neutral-600 text-white"
            defaultValue={searchQuery}
          />
        </div>
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-neutral-300">Trending Vibes</h4>
          <div className="flex flex-wrap gap-2">
            {trendingVibes.map((vibe) => (
              <Badge 
                key={vibe}
                variant="outline" 
                className="cursor-pointer hover:bg-primary hover:text-white text-neutral-300 border-neutral-600"
              >
                {vibe}
              </Badge>
            ))}
          </div>
        </div>
        
        {selectedCategory && (
          <div className="pt-2 border-t border-neutral-700">
            <span className="text-sm text-neutral-400">Category: </span>
            <Badge variant="secondary">{selectedCategory}</Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SearchVibes;
