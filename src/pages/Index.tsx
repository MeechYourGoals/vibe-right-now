
import React, { useState } from 'react';
import Header from '@/components/Header';
import SearchVibes from '@/components/SearchVibes';
import { useNavigate } from 'react-router-dom'; 
import { mockLocations } from '@/mock/data';
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockLocations.slice(0, 4).map(location => (
              <div key={location.id} className="bg-white rounded-lg shadow-md p-4">
                <h3 className="font-semibold">{location.name}</h3>
                <p className="text-sm text-muted-foreground">{location.address}</p>
                <p className="text-xs text-muted-foreground mt-1">{location.city}, {location.state}</p>
              </div>
            ))}
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Trending Locations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockLocations.slice(4, 10).map(location => (
                <div key={location.id} className="bg-white rounded-lg shadow-md p-4">
                  <h3 className="font-semibold">{location.name}</h3>
                  <p className="text-sm text-muted-foreground">{location.address}</p>
                  <p className="text-xs text-muted-foreground mt-1">{location.city}, {location.state}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Discount Locations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockLocations.slice(10, 14).map(location => (
                <div key={location.id} className="bg-white rounded-lg shadow-md p-4">
                  <h3 className="font-semibold">{location.name}</h3>
                  <p className="text-sm text-muted-foreground">{location.address}</p>
                  <p className="text-xs text-muted-foreground mt-1">{location.city}, {location.state}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <VernonChat />
    </div>
  );
};

export default Index;
