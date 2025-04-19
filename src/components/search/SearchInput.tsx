
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, Search } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onFilterToggle: () => void;
  onClick: () => void;
  placeholder: string;
  isAnalyzing: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onSubmit,
  onFilterToggle,
  onClick,
  placeholder,
  isAnalyzing
}) => {
  return (
    <div className="relative flex">
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
        onClick={onClick}
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
          onClick={onSubmit}
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
