
import React, { useState } from 'react';
import Header from '@/components/Header';
import SearchVibes from '@/components/SearchVibes';
import { useNavigate } from 'react-router-dom'; 
import { mockLocations } from '@/mock/data';
import RecommendedForYou from '@/components/RecommendedForYou';
import TrendingLocations from '@/components/TrendingLocations';
import DiscountLocations from '@/components/DiscountLocations';
import { LocalAIService } from '@/services/LocalAIService';
import VernonChat from '@/components/VernonChat';

const Index: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // Initialize AI services
  React.useEffect(() => {
    const initAI = async () => {
      await LocalAIService.init();
    };
    initAI();
  }, []);

  const handleSearch = (query: string) => {
    const searchParams = new URLSearchParams();
    if (query) {
      searchParams.set('q', query);
    }
    navigate(`/explore?${searchParams.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6">
        <h1 className="text-4xl font-bold text-center mb-6 vibe-gradient-text">
          Find Your Vibe
        </h1>
        
        <div className="max-w-xl mx-auto mb-12">
          <SearchVibes onSearch={handleSearch} />
        </div>
        
        <div className="space-y-12">
          <RecommendedForYou locations={mockLocations.slice(0, 4)} />
          <TrendingLocations locations={mockLocations.slice(4, 10)} />
          <DiscountLocations locations={mockLocations.slice(10, 14)} />
        </div>
      </main>
      
      <VernonChat />
    </div>
  );
};

export default Index;
