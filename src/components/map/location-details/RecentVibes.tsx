
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Play, Volume2 } from "lucide-react";
import { Media } from "@/types";

interface RecentVibesProps {
  locationId: string;
}

const RecentVibes = ({ locationId }: RecentVibesProps) => {
  // Mock data for recent vibes
  const recentVibes = [
    {
      id: "1",
      user: { username: "musiclover", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
      vibe: "🔥 Energy",
      timestamp: "2 mins ago",
      media: { id: "1", type: "image" as const, url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=200&fit=crop" } as Media,
      crowdLevel: "packed"
    },
    {
      id: "2", 
      user: { username: "nightowl", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
      vibe: "✨ Chill",
      timestamp: "5 mins ago",
      media: { id: "2", type: "image" as const, url: "https://images.unsplash.com/photo-1571945031378-eabb8e63b9d8?w=300&h=200&fit=crop" } as Media,
      crowdLevel: "moderate"
    },
    {
      id: "3",
      user: { username: "partygirl", avatar: "https://randomuser.me/api/portraits/women/3.jpg" },
      vibe: "💃 Dancing",
      timestamp: "8 mins ago",
      media: { id: "3", type: "video" as const, url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=200&fit=crop" } as Media,
      crowdLevel: "busy"
    }
  ];

  const getCrowdBadgeColor = (level: string) => {
    switch (level) {
      case 'packed': return 'bg-red-500';
      case 'busy': return 'bg-orange-500';
      case 'moderate': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  const getVisualOnlyMedia = (media: Media) => {
    return media.type === 'image' || media.type === 'video' ? media : null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Vibes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentVibes.map((vibe) => {
            const visualMedia = getVisualOnlyMedia(vibe.media);
            
            return (
              <div key={vibe.id} className="flex space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={vibe.user.avatar} alt={vibe.user.username} />
                  <AvatarFallback>{vibe.user.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm">@{vibe.user.username}</span>
                      <Badge variant="outline" className="text-xs">
                        {vibe.vibe}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">{vibe.timestamp}</span>
                  </div>
                  
                  {visualMedia && (
                    <div className="mt-2 relative">
                      <div className="relative rounded-lg overflow-hidden bg-muted">
                        <img 
                          src={visualMedia.url} 
                          alt="Vibe media"
                          className="w-full h-24 object-cover"
                        />
                        {visualMedia.type === 'video' && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-black bg-opacity-50 rounded-full p-2">
                              <Play className="h-4 w-4 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant="secondary" 
                        className={`text-xs text-white ${getCrowdBadgeColor(vibe.crowdLevel)}`}
                      >
                        {vibe.crowdLevel}
                      </Badge>
                      <Volume2 className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Live audio</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentVibes;
