
import React from 'react';
import { Location, VenueHours } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Clock, Phone, Globe, Share, Heart, Bookmark } from 'lucide-react';

interface VenueProfileHeaderProps {
  venue: Location;
  onShare?: () => void;
  onSave?: () => void;
  onLike?: () => void;
}

const VenueProfileHeader: React.FC<VenueProfileHeaderProps> = ({
  venue,
  onShare,
  onSave,
  onLike
}) => {
  const renderHours = (hours: string | VenueHours | { [key: string]: string | { open: string; close: string; closed?: boolean } }) => {
    if (typeof hours === 'string') {
      return <span className="text-sm">{hours}</span>;
    }
    
    if (typeof hours === 'object' && hours !== null) {
      if ('isOpen24Hours' in hours && hours.isOpen24Hours) {
        return <span className="text-sm text-green-600">Open 24 Hours</span>;
      }
      
      // Handle current day or show summary
      const today = new Date().toLocaleDateString('en-US', { weekday: 'lowercase' });
      const todayHours = hours[today as keyof typeof hours];
      
      if (typeof todayHours === 'object' && todayHours !== null && 'open' in todayHours) {
        if (todayHours.closed) {
          return <span className="text-sm text-red-600">Closed Today</span>;
        }
        return <span className="text-sm">{todayHours.open} - {todayHours.close}</span>;
      }
      
      return <span className="text-sm">Hours Available</span>;
    }
    
    return <span className="text-sm">Hours not available</span>;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-2xl font-bold">{venue.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="text-gray-600">{venue.address}, {venue.city}</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onShare}>
            <Share className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={onSave}>
            <Bookmark className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={onLike}>
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        {venue.rating && (
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
            <span className="font-medium">{venue.rating}</span>
          </div>
        )}
        
        {venue.price_level && (
          <div className="flex items-center">
            <span className="font-medium">{'$'.repeat(venue.price_level)}</span>
          </div>
        )}
        
        <Badge variant="secondary">{venue.type}</Badge>
        
        {venue.verified && (
          <Badge variant="default" className="bg-green-100 text-green-800">
            ✓ Verified
          </Badge>
        )}
      </div>

      {venue.vibes && venue.vibes.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {venue.vibes.map((vibe, index) => (
            <Badge key={index} variant="outline">{vibe}</Badge>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
        {venue.hours && (
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            {renderHours(venue.hours)}
          </div>
        )}
        
        {venue.phone && (
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{venue.phone}</span>
          </div>
        )}
        
        {venue.website && (
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-gray-500" />
            <a href={venue.website} target="_blank" rel="noopener noreferrer" 
               className="text-sm text-blue-600 hover:underline">
              Website
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default VenueProfileHeader;
