import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useToast } from "@/hooks/use-toast";
import { Car, MapPin, User, Shield, Ticket, Tag, UserCheck, BellRing, Bell, Fingerprint, EyeOff, Eye, Lock, Store } from "lucide-react";

const PREFERENCE_TAGS = [
  "Cozy", "High Energy", "Locally Owned", "Clubs", "Lounges", 
  "Early Morning Risers", "Night Owls", "Fitness", "Outdoors", 
  "Chains", "Women Owned", "Black Owned", "Franchises", 
  "Family Friendly", "Date Night", "Physical Adventure", 
  "Differently Abled Accessible", "Fine Dining", "Casual", 
  "Budget Friendly", "Luxury", "Pet Friendly", "Live Music",
  "Art", "Theater", "Shopping", "Sightseeing", "Historic"
];

const TICKETING_PLATFORMS = [
  { name: "Ticketmaster", id: "ticketmaster" },
  { name: "StubHub", id: "stubhub" },
  { name: "AXS", id: "axs" },
  { name: "EventBrite", id: "eventbrite" },
  { name: "OpenTable", id: "opentable" },
  { name: "Partiful", id: "partiful" },
  { name: "Other", id: "other" }
];

const Settings = () => {
  const { toast } = useToast();
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [profileVisibility, setProfileVisibility] = useState<boolean>(true);
  const [showVisitedPlaces, setShowVisitedPlaces] = useState<boolean>(true);
  const [defaultRideService, setDefaultRideService] = useState<string>("uber");
  const [activeTab, setActiveTab] = useState("preferences");
  const [otherPlatform, setOtherPlatform] = useState("");

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleConnectPlatform = (platformId: string) => {
    toast({
      title: "Connecting to platform",
      description: `Initiating connection to ${platformId === 'other' ? otherPlatform : platformId}...`,
    });
    // In a real app, this would trigger an OAuth flow or similar
  };

  const handlePreferenceToggle = (value: string[]) => {
    setSelectedPreferences(value);
  };

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        
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
            <TabsTrigger value="transportation" className="flex items-center gap-2">
              <Car className="h-4 w-4" />
              <span className="hidden md:inline">Transportation</span>
            </TabsTrigger>
            <TabsTrigger value="ticketing" className="flex items-center gap-2">
              <Ticket className="h-4 w-4" />
              <span className="hidden md:inline">Ticketing</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden md:inline">Account</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Preferences</CardTitle>
                <CardDescription>
                  Select categories that interest you for personalized recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Your Interests</h3>
                  <ToggleGroup 
                    type="multiple" 
                    variant="outline"
                    className="flex flex-wrap gap-2"
                    value={selectedPreferences}
                    onValueChange={handlePreferenceToggle}
                  >
                    {PREFERENCE_TAGS.map(tag => (
                      <ToggleGroupItem 
                        key={tag.toLowerCase().replace(/\s+/g, '-')} 
                        value={tag.toLowerCase().replace(/\s+/g, '-')}
                        className="rounded-full"
                        aria-label={tag}
                      >
                        {tag}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
                <Button onClick={handleSaveSettings}>Save Preferences</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>
                  Control who can see your profile and activities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="profile-visibility" className="flex items-center">
                      {profileVisibility ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
                      Profile Visibility
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {profileVisibility ? "Your profile is public" : "Your profile is private"}
                    </p>
                  </div>
                  <Switch
                    id="profile-visibility"
                    checked={profileVisibility}
                    onCheckedChange={setProfileVisibility}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="visited-places" className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      Show Visited Places
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {showVisitedPlaces ? "Others can see places you've visited" : "Your visited places are hidden"}
                    </p>
                  </div>
                  <Switch
                    id="visited-places"
                    checked={showVisitedPlaces}
                    onCheckedChange={setShowVisitedPlaces}
                  />
                </div>
                
                <Button onClick={handleSaveSettings}>Save Privacy Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="transportation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Transportation Settings</CardTitle>
                <CardDescription>
                  Configure your preferred ride services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label className="font-medium">Default Ride Service</Label>
                    <RadioGroup 
                      defaultValue={defaultRideService} 
                      onValueChange={setDefaultRideService}
                      className="mt-3 space-y-3"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="uber" id="uber" />
                        <Label htmlFor="uber">Uber</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="lyft" id="lyft" />
                        <Label htmlFor="lyft">Lyft</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="waymo" id="waymo" />
                        <Label htmlFor="waymo">Waymo</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2 pt-4">
                    <Label htmlFor="service-account-id">Service Account ID (Optional)</Label>
                    <Input id="service-account-id" placeholder="Enter your account ID" />
                  </div>
                  <Button onClick={handleSaveSettings} className="mt-4">Save Transportation Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ticketing" className="space-y-6">
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
                    <div key={platform.id} className="flex items-center justify-between">
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
                            onClick={() => handleConnectPlatform("other")}
                            disabled={!otherPlatform}
                          >
                            Connect
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          variant="outline" 
                          onClick={() => handleConnectPlatform(platform.id)}
                        >
                          Connect
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences and security
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="display-name">Display Name</Label>
                    <Input id="display-name" placeholder="Your display name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Your email" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Notification Preferences</Label>
                  <div className="pt-2 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <BellRing className="h-4 w-4" />
                        <Label htmlFor="notifications-all">All Notifications</Label>
                      </div>
                      <Switch id="notifications-all" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Bell className="h-4 w-4" />
                        <Label htmlFor="notifications-events">Event Updates</Label>
                      </div>
                      <Switch id="notifications-events" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <UserCheck className="h-4 w-4" />
                        <Label htmlFor="notifications-follows">New Followers</Label>
                      </div>
                      <Switch id="notifications-follows" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Store className="h-4 w-4" />
                        <Label htmlFor="notifications-venue-follows">Venue Follows</Label>
                      </div>
                      <Switch id="notifications-venue-follows" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <Button onClick={handleSaveSettings}>Save Account Settings</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>
                  Actions here cannot be undone
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="confirm-deletion" className="flex items-center text-destructive">
                    <Lock className="h-4 w-4 mr-2" />
                    Delete Account
                  </Label>
                  <div className="pt-2 flex gap-2">
                    <Input 
                      id="confirm-deletion" 
                      placeholder="Type 'delete' to confirm" 
                      className="max-w-xs"
                    />
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
