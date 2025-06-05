
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Building, User, Sparkles } from "lucide-react";
import SearchVibes from "@/components/SearchVibes";
import RealPlacesSearchBar from "@/components/search/RealPlacesSearchBar";
import { Location } from "@/types";

interface SearchSectionProps {
  showDateFilter: boolean;
  dateRange: { from: Date | undefined; to: Date | undefined } | undefined;
  onSearch: (query: string, filterType: string, category: string) => void;
  onDateRangeChange: (range: { from: Date | undefined; to: Date | undefined } | undefined) => void;
  onClearDates: () => void;
  onRealPlaceSelect?: (place: Location) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  showDateFilter,
  dateRange,
  onSearch,
  onDateRangeChange,
  onClearDates,
  onRealPlaceSelect
}) => {
  const [activeTab, setActiveTab] = React.useState("places");

  const handleRealPlaceSelect = (place: Location) => {
    if (onRealPlaceSelect) {
      onRealPlaceSelect(place);
    }
  };

  return (
    <div className="max-w-xl mx-auto mb-6">
      {/* Search Type Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-4">
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

      {/* Real Places Search - Only show on Places tab */}
      {activeTab === "places" && (
        <div className="mb-4">
          <RealPlacesSearchBar 
            onPlaceSelect={handleRealPlaceSelect}
            placeholder="Search for real places anywhere in the world..."
          />
        </div>
      )}

      {/* Original SearchVibes for other tabs */}
      {activeTab !== "places" && (
        <SearchVibes onSearch={onSearch} />
      )}
    </div>
  );
};

export default SearchSection;
