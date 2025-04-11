
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { formatHoursForDisplay } from '@/utils/businessHoursUtils';
import { Location } from '@/types';

interface VenueMapProps {
  address?: string;
  latitude?: number;
  longitude?: number;
  venue?: Location;
  onExpand?: () => void;
}

const VenueMap: React.FC<VenueMapProps> = ({ 
  address, 
  latitude, 
  longitude, 
  venue,
  onExpand
}) => {
  // Use venue properties if provided, otherwise use individual props
  const venueAddress = venue?.address || address || '';
  const venueLat = venue?.lat || latitude || 0;
  const venueLng = venue?.lng || longitude || 0;
  
  // Create properly formatted business hours
  const businessHours = {
    monday: { open: "9:00 AM", close: "5:00 PM" },
    tuesday: { open: "9:00 AM", close: "5:00 PM" },
    wednesday: { open: "9:00 AM", close: "5:00 PM" },
    thursday: { open: "9:00 AM", close: "5:00 PM" },
    friday: { open: "9:00 AM", close: "5:00 PM" },
    saturday: { open: "10:00 AM", close: "3:00 PM" },
    sunday: { open: "Closed", close: "Closed" }
  };

  const todayKey = new Date().toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase();
  const today = todayKey === 'mon' ? 'monday' : 
                todayKey === 'tue' ? 'tuesday' : 
                todayKey === 'wed' ? 'wednesday' : 
                todayKey === 'thu' ? 'thursday' : 
                todayKey === 'fri' ? 'friday' : 
                todayKey === 'sat' ? 'saturday' : 'sunday';

  return (
    <Card className="border shadow-sm overflow-hidden">
      <div className="relative h-[200px] bg-muted">
        <iframe
          title="Venue Location"
          width="100%"
          height="100%"
          frameBorder="0"
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBNLrJhOMz6idD05pzwk_7PtfYnX6RBKW8&q=${venueLat},${venueLng}&zoom=15`}
          allowFullScreen
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-start gap-2">
          <MapPin className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <p className="font-medium">{venueAddress}</p>
            <p className="text-sm text-muted-foreground">
              {formatHoursForDisplay(today, businessHours[today as keyof typeof businessHours])}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VenueMap;
