
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { TICKETING_PLATFORMS } from "./constants";

interface TicketingPlatform {
  id: string;
  name: string;
  connected: boolean;
}

export function TicketingTab() {
  const [connectedPlatforms, setConnectedPlatforms] = useState<TicketingPlatform[]>([]);
  const [autoSync, setAutoSync] = useState(true);
  
  // Initialize ticketing platforms with connection status
  useEffect(() => {
    const platforms = TICKETING_PLATFORMS.map((platform, index) => ({
      id: `platform-${index}`,
      name: platform,
      connected: index < 3 // First 3 are connected by default for demo
    }));
    
    setConnectedPlatforms(platforms);
  }, []);
  
  const handleTogglePlatform = (platformId: string) => {
    setConnectedPlatforms(platforms => 
      platforms.map(platform => 
        platform.id === platformId 
          ? { ...platform, connected: !platform.connected } 
          : platform
      )
    );
  };

  return (
    <div className="space-y-6 bg-card p-6 rounded-lg border shadow-sm">
      <div>
        <h3 className="text-lg font-medium">Ticketing Platform Integration</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Connect your ticketing platforms to display event information and availability.
        </p>
        
        <div className="space-y-4">
          {connectedPlatforms.map(platform => (
            <div key={platform.id} className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id={platform.id} 
                  checked={platform.connected} 
                  onCheckedChange={() => handleTogglePlatform(platform.id)}
                />
                <Label htmlFor={platform.id}>{platform.name}</Label>
              </div>
              {platform.connected && (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Connected</span>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="border-t pt-4">
        <h3 className="text-lg font-medium mb-4">Synchronization Settings</h3>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="auto-sync">Automatic Synchronization</Label>
            <p className="text-sm text-muted-foreground">
              Automatically sync event data from connected platforms
            </p>
          </div>
          <Switch
            id="auto-sync"
            checked={autoSync}
            onCheckedChange={setAutoSync}
          />
        </div>
        
        <div className="mt-6">
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}

export default TicketingTab;
