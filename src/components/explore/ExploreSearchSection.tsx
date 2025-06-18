
import React, { useState } from "react";
import EnhancedSearchSection from "./EnhancedSearchSection";
import { Location } from "@/types";

interface ExploreSearchSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  dateRange?: { from: Date; to: Date } | null;
  onDateChange: (dates: { from: Date; to: Date } | null) => void;
  location: string;
  onLocationChange: (location: string) => void;
  onPlaceSelect: (place: Location) => void;
  onVenueSelect: (venue: Location) => void;
}

const ExploreSearchSection: React.FC<ExploreSearchSectionProps> = ({
  searchQuery,
  onSearchChange,
  dateRange,
  onDateChange,
  location,
  onLocationChange,
  onPlaceSelect,
  onVenueSelect
}) => {
  return (
    <EnhancedSearchSection 
      searchQuery={searchQuery}
      onSearchQueryChange={onSearchChange}
      selectedDates={dateRange ? { from: dateRange.from, to: dateRange.to } : null}
      onDateChange={(dates) => onDateChange(dates ? { from: dates.from, to: dates.to } : null)}
      location={location}
      onLocationChange={onLocationChange}
      onPlaceSelect={onPlaceSelect}
      onVenueSelect={onVenueSelect}
    />
  );
};

export default ExploreSearchSection;
