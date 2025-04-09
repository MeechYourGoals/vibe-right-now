
import { useState } from 'react';

/**
 * Hook to manage pagination state for chat queries
 */
export const usePaginationState = () => {
  const [currentPaginationState, setCurrentPaginationState] = useState<Record<string, number>>({});

  const updatePaginationState = (paginationParams: Record<string, number>) => {
    // Update pagination state
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
