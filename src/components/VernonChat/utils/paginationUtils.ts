
import { useState } from 'react';

/**
 * Extracts pagination parameters from user query
 */
export const extractPaginationParams = (query: string): Record<string, number> => {
  const params: Record<string, number> = {};
  
  const categoryPageRegex = /(?:page\s*(\d+)\s*(?:of|for)\s*([a-z]+))|(?:([a-z]+)\s*page\s*(\d+))/i;
  const match = query.match(categoryPageRegex);
  
  if (match) {
    const page = parseInt(match[1] || match[4], 10);
    const category = (match[2] || match[3]).toLowerCase();
    
    if (!isNaN(page) && category) {
      params[category] = page;
    }
  }
  
  if (query.toLowerCase().includes("next page")) {
    params._nextPage = 2;
    
    const categories = ["sports", "events", "dining", "restaurants", "nightlife", "bars", "attractions", "concerts"];
    for (const category of categories) {
      if (query.toLowerCase().includes(category)) {
        params[category] = 2;
        break;
      }
    }
  }
  
  if (query.toLowerCase().includes("previous page") || query.toLowerCase().includes("prev page")) {
    params._prevPage = 1;
    
    const categories = ["sports", "events", "dining", "restaurants", "nightlife", "bars", "attractions", "concerts"];
    for (const category of categories) {
      if (query.toLowerCase().includes(category)) {
        params[category] = 1;
        break;
      }
    }
  }
  
  return params;
};

/**
 * Hook to manage pagination state for chat queries
 */
export const usePaginationState = () => {
  const [currentPaginationState, setCurrentPaginationState] = useState<Record<string, number>>({});

  const updatePaginationState = (paginationParams: Record<string, number>) => {
    let updatedPaginationState = { ...currentPaginationState };
    
    Object.keys(paginationParams).forEach(key => {
      if (key === '_nextPage') {
        Object.keys(updatedPaginationState).forEach(category => {
          updatedPaginationState[category] = (updatedPaginationState[category] || 1) + 1;
        });
      } else if (key === '_prevPage') {
        Object.keys(updatedPaginationState).forEach(category => {
          updatedPaginationState[category] = Math.max(1, (updatedPaginationState[category] || 1) - 1);
        });
      } else {
        updatedPaginationState[key] = paginationParams[key];
      }
    });
    
    setCurrentPaginationState(updatedPaginationState);
    return updatedPaginationState;
  };

  return {
    currentPaginationState,
    updatePaginationState
  };
};
