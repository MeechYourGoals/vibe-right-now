
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Check, X, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VibeWithMeNotificationProps {
  username: string;
  userAvatar?: string;
  locationName: string;
  timeDescription: string;
  onAccept?: () => void;
  onDecline?: () => void;
}

const VibeWithMeNotification = ({
  username,
  userAvatar,
  locationName,
  timeDescription,
  onAccept,
  onDecline
}: VibeWithMeNotificationProps) => {
  const { toast } = useToast();
  
  const handleAccept = () => {
    toast({
      title: "Response Sent",
      description: `You accepted ${username}'s invitation to vibe at ${locationName}.`,
    });
    if (onAccept) onAccept();
  };
  
  const handleDecline = () => {
    toast({
      title: "Response Sent",
      description: `You declined ${username}'s invitation.`,
    });
    if (onDecline) onDecline();
  };
  
  return (
    <div className="flex items-start gap-4 p-4 border rounded-lg bg-card">
      <Avatar>
        <AvatarImage src={userAvatar} alt={username} />
        <AvatarFallback>{username.substring(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1">
        <p className="font-medium">
          <span className="font-semibold">{username}</span> posted a Vibe With Me for {timeDescription} at {locationName}
        </p>
        
        <div className="mt-2 flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" /> {locationName}
          <span className="mx-2">•</span>
          <Clock className="h-4 w-4 mr-1" /> {timeDescription}
        </div>
        
        <div className="mt-3 flex gap-2">
          <Button size="sm" onClick={handleAccept}>
            <Check className="h-4 w-4 mr-1" /> I'll Be There
          </Button>
          <Button size="sm" variant="outline" onClick={handleDecline}>
            <X className="h-4 w-4 mr-1" /> Not This Time
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VibeWithMeNotification;
