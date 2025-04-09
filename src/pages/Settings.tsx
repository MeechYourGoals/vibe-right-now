
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Tag, Shield, Car, Ticket, User, Building2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import PreferencesTab from "./settings/PreferencesTab";
import PrivacyTab from "./settings/PrivacyTab";
import TransportationTab from "./settings/TransportationTab";
import TicketingTab from "./settings/TicketingTab";
import AccountTab from "./settings/AccountTab";

const Settings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("preferences");
  const [isVenueMode, setIsVenueMode] = useState(false);

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleConnectPlatform = (platformId: string) => {
    toast({
      title: "Connecting to platform",
      description: `Initiating connection to ${platformId === 'other' ? "custom platform" : platformId}...`,
    });
    // In a real app, this would trigger an OAuth flow or similar
  };

  const toggleMode = () => {
    setIsVenueMode(!isVenueMode);
    toast({
      title: `Switched to ${!isVenueMode ? "Venue" : "User"} Mode`,
      description: `Settings are now configured for ${!isVenueMode ? "venue management" : "regular user"}.`,
    });
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Settings</h1>
          
          <div className="flex items-center space-x-2">
            <Label htmlFor="mode-toggle" className="flex items-center gap-2">
              <User className={`h-4 w-4 ${!isVenueMode ? "text-primary" : "text-muted-foreground"}`} />
              <span className={!isVenueMode ? "font-medium" : "text-muted-foreground"}>User</span>
            </Label>
            <Switch 
              id="mode-toggle" 
              checked={isVenueMode} 
              onCheckedChange={toggleMode} 
            />
            <Label htmlFor="mode-toggle" className="flex items-center gap-2">
              <Building2 className={`h-4 w-4 ${isVenueMode ? "text-primary" : "text-muted-foreground"}`} />
              <span className={isVenueMode ? "font-medium" : "text-muted-foreground"}>Venue</span>
            </Label>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 grid grid-cols-3 md:grid-cols-5 gap-2">
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              <span className="hidden md:inline">Preferences</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden md:inline">Privacy</span>
            </TabsTrigger>
            {isVenueMode ? (
              <>
                <TabsTrigger value="management" className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  <span className="hidden md:inline">Management</span>
                </TabsTrigger>
                <TabsTrigger value="marketing" className="flex items-center gap-2">
                  <Ticket className="h-4 w-4" />
                  <span className="hidden md:inline">Marketing</span>
                </TabsTrigger>
              </>
            ) : (
              <>
                <TabsTrigger value="transportation" className="flex items-center gap-2">
                  <Car className="h-4 w-4" />
                  <span className="hidden md:inline">Transportation</span>
                </TabsTrigger>
                <TabsTrigger value="ticketing" className="flex items-center gap-2">
                  <Ticket className="h-4 w-4" />
                  <span className="hidden md:inline">Ticketing</span>
                </TabsTrigger>
              </>
            )}
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden md:inline">Account</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="preferences" className="space-y-6">
            <PreferencesTab onSave={handleSaveSettings} isVenueMode={isVenueMode} />
          </TabsContent>
          
          <TabsContent value="privacy" className="space-y-6">
            <PrivacyTab onSave={handleSaveSettings} isVenueMode={isVenueMode} />
          </TabsContent>
          
          {isVenueMode ? (
            <>
              <TabsContent value="management" className="space-y-6">
                <div className="bg-card p-6 rounded-lg border shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Venue Management</h2>
                  <p className="text-muted-foreground mb-4">
                    Configure settings for managing your venue, including staff access, hours of operation, and more.
                  </p>
                  {/* Venue management settings would go here */}
                </div>
              </TabsContent>
              
              <TabsContent value="marketing" className="space-y-6">
                <div className="bg-card p-6 rounded-lg border shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Marketing Settings</h2>
                  <p className="text-muted-foreground mb-4">
                    Manage marketing campaigns, promotions, and customer engagement settings.
                  </p>
                  {/* Marketing settings would go here */}
                </div>
              </TabsContent>
            </>
          ) : (
            <>
              <TabsContent value="transportation" className="space-y-6">
                <TransportationTab onSave={handleSaveSettings} />
              </TabsContent>
              
              <TabsContent value="ticketing" className="space-y-6">
                <TicketingTab onConnectPlatform={handleConnectPlatform} />
              </TabsContent>
            </>
          )}
          
          <TabsContent value="account" className="space-y-6">
            <AccountTab onSave={handleSaveSettings} isVenueMode={isVenueMode} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
