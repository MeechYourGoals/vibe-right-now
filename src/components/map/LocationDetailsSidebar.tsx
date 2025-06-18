import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Clock, Star, Users, Wifi, CreditCard, Car, Utensils, Coffee, Wine, Music } from "lucide-react";
import { Location } from "@/types";
import BusinessHours from "@/components/BusinessHours";
import RecentVibes from "./location-details/RecentVibes";

interface LocationDetailsSidebarProps {
  location: Location | null;
  isOpen: boolean;
  onClose: () => void;
}

const LocationDetailsSidebar = ({ location, isOpen, onClose }: LocationDetailsSidebarProps) => {
  if (!location || !isOpen) return null;

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const amenitiesData = [
    { icon: Wifi, label: "Free Wi-Fi" },
    { icon: CreditCard, label: "Accepts Credit Cards" },
    { icon: Car, label: "Parking Available" },
    { icon: Utensils, label: "Serves Food" },
    { icon: Coffee, label: "Serves Coffee" },
    { icon: Wine, label: "Serves Alcohol" },
    { icon: Music, label: "Live Music" },
  ];

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-background border-l shadow-lg z-50 overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>{location.name}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="py-4">
            <div className="text-sm text-muted-foreground">
              {location.address}, {location.city}, {location.country}
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>{location.rating || '4.5'} ({location.rating ? Math.floor(Math.random() * 500) : '300'}+ reviews)</span>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Users className="h-4 w-4 text-blue-500" />
              <span>{location.followers || '250'} Followers</span>
            </div>
          </CardContent>
        </Card>

        {/* Business Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="text-md font-semibold">Business Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <BusinessHours location={location} />
          </CardContent>
        </Card>

        {/* Amenities */}
        <Card>
          <CardHeader>
            <CardTitle className="text-md font-semibold">Amenities</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2">
            {amenitiesData.map((amenity, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <amenity.icon className="h-4 w-4 text-muted-foreground" />
                <span>{amenity.label}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Vibes */}
        <RecentVibes locationId={location.id} />

        {/* Action Buttons */}
        <div className="flex justify-between">
          <Button variant="outline">
            <a href={`https://maps.google.com/?q=${location.name}+${location.address}+${location.city}`} target="_blank" rel="noopener noreferrer">
              View on Map
            </a>
          </Button>
          <Button>Check In</Button>
        </div>
      </div>
    </div>
  );
};

export default LocationDetailsSidebar;
