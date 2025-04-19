
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown } from "lucide-react";

interface SearchInputProps {
  searchQuery: string;
  searchCategory: string;
  isAnalyzing: boolean;
  placeholder: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInputClick: () => void;
  onSearch: () => void;
  onFilterToggle: () => void;
}

const SearchInput = ({
  searchQuery,
  searchCategory,
  isAnalyzing,
  placeholder,
  onInputChange,
  onInputClick,
  onSearch,
  onFilterToggle,
}: SearchInputProps) => {
  return (
    <div className="relative flex">
      <Input
        type="search"
        placeholder={placeholder}
        value={searchQuery}
        onChange={onInputChange}
        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        onClick={onInputClick}
        className="pr-20"
      />
      <div className="absolute right-0 top-0 flex h-full">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onFilterToggle}
          className="h-full rounded-none"
        >
          <ChevronDown className="h-4 w-4" />
        </Button>
        <Button 
          variant={isAnalyzing ? "secondary" : "ghost"}
          size="icon" 
          onClick={onSearch}
          disabled={isAnalyzing}
          className="h-full rounded-none rounded-r-md"
        >
          {isAnalyzing ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default SearchInput;
