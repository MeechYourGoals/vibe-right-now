
import React from 'react';
import { Location } from '@/types';
import { Star, MapPin, Clock } from 'lucide-react';

interface InfoWindowContentProps {
  location: Location;
  onClose?: () => void;
}

const InfoWindowContent: React.FC<InfoWindowContentProps> = ({ 
  location, 
  onClose 
}) => {
  const formatRating = (rating?: number) => {
    if (!rating) return 'No rating';
    return rating.toFixed(1);
  };

  const formatPriceRange = (priceRange?: string) => {
    if (!priceRange) return 'Price not available';
    return priceRange;
  };

  return (
    <div className="p-3 min-w-[250px] max-w-[300px]">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg text-gray-800 leading-tight">
          {location.name}
        </h3>
        {onClose && (
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 ml-2"
          >
            ✕
          </button>
        )}
      </div>
      
      <div className="flex items-center gap-2 mb-2">
        <MapPin className="h-4 w-4 text-gray-600" />
        <span className="text-sm text-gray-600 truncate">
          {location.address}
        </span>
      </div>
      
      <div className="flex items-center gap-4 mb-2">
        {location.rating && (
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium">
              {formatRating(location.rating)}
            </span>
          </div>
        )}
        
        {location.priceRange && (
          <span className="text-sm text-gray-600">
            {formatPriceRange(location.priceRange)}
          </span>
        )}
      </div>
      
      {location.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {location.description}
        </p>
      )}
      
      <div className="flex items-center gap-2 mb-3">
        <Clock className="h-4 w-4 text-gray-600" />
        <span className="text-sm text-gray-600">
          {location.isOpen ? 'Open now' : 'Closed'}
        </span>
      </div>
      
      {location.vibeScore && (
        <div className="bg-purple-100 rounded-lg p-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-purple-800">
              Vibe Score
            </span>
            <span className="text-lg font-bold text-purple-600">
              {location.vibeScore}/10
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoWindowContent;
