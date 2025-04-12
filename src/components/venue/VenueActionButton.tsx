
import React from 'react';
import { Button } from "@/components/ui/button";
import { Check, Camera, Star, Map, MapPin, Clock, Share2, Heart, BookOpen, Calendar } from 'lucide-react';
import { Location } from '@/types';

type IconType = 'Check' | 'Camera' | 'Star' | 'Map' | 'MapPin' | 'Clock' | 'Share' | 'Heart' | 'BookOpen' | 'Calendar';

export interface VenueActionButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  className?: string;
  onClick: () => void;
  icon: IconType;
  children?: React.ReactNode;
  venue?: Location;
  size?: "default" | "sm" | "lg" | "icon";
}

const VenueActionButton: React.FC<VenueActionButtonProps> = ({ 
  variant = "default", 
  className = "", 
  onClick, 
  icon,
  children,
  venue,
  size = "default"
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'Check': return <Check className="h-4 w-4" />;
      case 'Camera': return <Camera className="h-4 w-4" />;
      case 'Star': return <Star className="h-4 w-4" />;
      case 'Map': return <Map className="h-4 w-4" />;
      case 'MapPin': return <MapPin className="h-4 w-4" />;
      case 'Clock': return <Clock className="h-4 w-4" />;
      case 'Share': return <Share2 className="h-4 w-4" />;
      case 'Heart': return <Heart className="h-4 w-4" />;
      case 'BookOpen': return <BookOpen className="h-4 w-4" />;
      case 'Calendar': return <Calendar className="h-4 w-4" />;
      default: return <Check className="h-4 w-4" />;
    }
  };
  
  return (
    <Button
      variant={variant}
      size={size}
      className={`flex items-center gap-2 ${className}`}
      onClick={onClick}
    >
      {getIcon()}
      {children}
    </Button>
  );
};

export default VenueActionButton;
