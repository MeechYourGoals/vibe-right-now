
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Search, Building, MapPin, User, Tag, TrendingUp, Sparkles } from "lucide-react";

interface SearchCategoryTabsProps {
  searchCategory: string;
  handleCategoryChange: (category: string) => void;
}

const SearchCategoryTabs: React.FC<SearchCategoryTabsProps> = ({
  searchCategory,
  handleCategoryChange,
}) => {
  return (
    <Tabs 
      value={searchCategory} 
      onValueChange={handleCategoryChange} 
      className="w-full mb-3"
    >
      <TabsList className="grid grid-cols-7 w-full">
        <TabsTrigger value="all" className="flex items-center gap-1">
          <Search className="h-3.5 w-3.5" />
          <span>All</span>
        </TabsTrigger>
        <TabsTrigger value="places" className="flex items-center gap-1">
          <Building className="h-3.5 w-3.5" />
          <span>Places</span>
        </TabsTrigger>
        <TabsTrigger value="nearby" className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" />
          <span>Nearby</span>
        </TabsTrigger>
        <TabsTrigger value="users" className="flex items-center gap-1">
          <User className="h-3.5 w-3.5" />
          <span>Users</span>
        </TabsTrigger>
        <TabsTrigger value="deals" className="flex items-center gap-1">
          <Tag className="h-3.5 w-3.5" />
          <span>Deals</span>
        </TabsTrigger>
        <TabsTrigger value="trending" className="flex items-center gap-1">
          <TrendingUp className="h-3.5 w-3.5" />
          <span>Trending</span>
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
