
import React from 'react';
import { Location } from '@/types';
import { MapPin, Share2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { generateBusinessHours } from '@/utils/businessHoursUtils';
import WaitTimeDisplay from '@/components/venue/WaitTimeDisplay';

interface InfoWindowContentProps {
  location: Location;
  onSelect: (location: Location) => void;
}

const InfoWindowContent: React.FC<InfoWindowContentProps> = ({ location, onSelect }) => {
  const navigate = useNavigate();

  // Ensure we have business hours
  if (!location.hours) {
    location.hours = generateBusinessHours(location);
  }
  
  // Get today's hours
  const today = new Date();
  const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const todaysHours = location.hours[dayOfWeek as keyof typeof location.hours];
  
  // Format hours for display
  const formatHours = (hours: any): string => {
    if (typeof hours === 'string') {
      return hours;
    }
    if (hours && typeof hours === 'object' && hours.open && hours.close) {
      return `${hours.open} - ${hours.close}`;
    }
    return 'Closed';
  };

  const handleViewVenue = () => {
    navigate(`/venue/${location.id}`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Check out ${location.name}`,
        text: `I found this amazing spot in ${location.city}!`,
        url: `${window.location.origin}/venue/${location.id}`
      }).catch(err => console.error('Error sharing:', err));
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(`${window.location.origin}/venue/${location.id}`)
        .then(() => alert('Link copied to clipboard!'))
        .catch(err => console.error('Could not copy text: ', err));
    }
  };

  return (
    <div className="w-64 p-2">
      <div className="font-bold text-lg mb-1">{location.name}</div>
      <div className="text-sm text-muted-foreground flex items-center mb-1">
        <MapPin className="h-3 w-3 mr-1" />
        <span>{location.address}, {location.city}</span>
      </div>
      <div className="text-sm mb-2">
        <span className="font-medium">Today:</span> {formatHours(todaysHours)}
      </div>
      
      {/* Display wait time if available */}
      <div className="mb-2">
        <WaitTimeDisplay venueId={location.id} showLastUpdated={false} />
      </div>
      
      <div className="text-sm mb-3">
        <span className="inline-block px-2 py-1 bg-primary/10 rounded-full text-xs">
          {location.type.charAt(0).toUpperCase() + location.type.slice(1)}
        </span>
        {location.vibes && location.vibes.map((vibe, i) => (
          <span key={i} className="inline-block ml-1 px-2 py-1 bg-muted rounded-full text-xs">
            {vibe}
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <Button 
          size="sm" 
          className="w-full bg-gradient-vibe"
          onClick={handleViewVenue}
        >
          <ExternalLink className="h-3 w-3 mr-1" />
          View Vibes
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={handleShare}
        >
          <Share2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default InfoWindowContent;
