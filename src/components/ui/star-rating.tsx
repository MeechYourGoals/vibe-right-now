
import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number; // Rating from 0 to 5
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showValue?: boolean;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({ 
  rating, 
  size = 'lg', 
  showValue = true, 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  const renderStar = (index: number) => {
    const starValue = index + 1;
    const fillPercentage = Math.min(Math.max(rating - index, 0), 1) * 100;
    
    return (
      <div key={index} className="relative inline-block">
        {/* Background (empty) star */}
        <Star 
          className={`${sizeClasses[size]} text-gray-300 dark:text-gray-600`} 
          fill="currentColor" 
        />
        {/* Foreground (filled) star */}
        <div 
          className="absolute top-0 left-0 overflow-hidden"
          style={{ width: `${fillPercentage}%` }}
        >
          <Star 
            className={`${sizeClasses[size]} text-yellow-400`} 
            fill="currentColor" 
          />
        </div>
      </div>
    );
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex">
        {[0, 1, 2, 3, 4].map(renderStar)}
      </div>
      {showValue && (
        <span className="ml-2 text-sm text-muted-foreground font-medium">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default StarRating;
