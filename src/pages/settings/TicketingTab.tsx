
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TICKETING_PLATFORMS } from "./constants";

interface TicketingTabProps {
  onConnectPlatform: (platformId: string) => void;
}

const TicketingTab = ({ onConnectPlatform }: TicketingTabProps) => {
  const [otherPlatform, setOtherPlatform] = useState("");
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ticketing Platforms</CardTitle>
        <CardDescription>
          Connect your ticketing and reservation accounts for faster booking
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {TICKETING_PLATFORMS.map(platform => (
            <div key={platform.id} className="flex items-center justify-between border p-3 rounded-md">
              <div>
                <h3 className="font-medium">{platform.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {platform.id === "other" 
                    ? "Connect to another platform" 
                    : `Quick access to ${platform.name} events and tickets`}
                </p>
              </div>
              {platform.id === "other" ? (
                <div className="flex gap-2">
                  <Input 
                    placeholder="Platform name" 
                    className="w-32 md:w-auto" 
                    value={otherPlatform}
                    onChange={(e) => setOtherPlatform(e.target.value)}
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => onConnectPlatform("other")}
                    disabled={!otherPlatform}
                  >
                    Connect
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  onClick={() => onConnectPlatform(platform.id)}
                >
                  Connect
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketingTab;
