
import React from 'react';
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';

interface PaginatedResultsProps {
  category: string;
  items: string[];
  currentPage: number;
  onPageChange: (category: string, page: number) => void;
  itemsPerPage?: number;
}

const PaginatedResults: React.FC<PaginatedResultsProps> = ({
  category,
  items,
  currentPage,
  onPageChange,
  itemsPerPage = 3
}) => {
  if (items.length === 0) return null;
  
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, items.length);
  const displayItems = items.slice(startIndex, endIndex);
  
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(category, currentPage - 1);
    }
  };
  
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(category, currentPage + 1);
    }
  };
  
  return (
    <div className="space-y-4 mb-4">
      <h3 className="text-lg font-semibold capitalize">{category} ({items.length})</h3>
      
      <ul className="space-y-2">
        {displayItems.map((item, index) => (
          <li key={index} className="text-sm">
            {index + 1 + startIndex}. {item}
          </li>
        ))}
      </ul>
      
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0"
              >
                <PaginationPrevious className="h-4 w-4" />
              </Button>
            </PaginationItem>
            
            <PaginationItem>
              <span className="text-sm px-2">
                Page {currentPage} of {totalPages}
              </span>
            </PaginationItem>
            
            <PaginationItem>
              <Button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0"
              >
                <PaginationNext className="h-4 w-4" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default PaginatedResults;
