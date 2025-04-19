
import React from 'react';
import { Search, Building, User, Sparkles } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface SearchCategoryTabsProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchCategoryTabs: React.FC<SearchCategoryTabsProps> = ({ value, onChange }) => {
  return (
    <Tabs 
      value={value} 
      onValueChange={onChange} 
      className="w-full mb-3"
    >
      <TabsList className="grid grid-cols-4 w-full">
        <TabsTrigger value="all" className="flex items-center gap-1">
          <Search className="h-3.5 w-3.5" />
          <span>All</span>
        </TabsTrigger>
        <TabsTrigger value="places" className="flex items-center gap-1">
          <Building className="h-3.5 w-3.5" />
          <span>Places</span>
        </TabsTrigger>
        <TabsTrigger value="users" className="flex items-center gap-1">
          <User className="h-3.5 w-3.5" />
          <span>Users</span>
        </TabsTrigger>
        <TabsTrigger value="vibes" className="flex items-center gap-1">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Vibes</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default SearchCategoryTabs;
