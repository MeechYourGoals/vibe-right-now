
import { useState } from 'react';

export interface ExploreState {
  selectedCategory: string;
  searchQuery: string;
  viewMode: 'map' | 'list';
}

export const useExploreState = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  return {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode
  };
};
