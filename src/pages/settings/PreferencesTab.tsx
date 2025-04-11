
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PlusCircle, X, Crown, Sparkles, Check } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PREFERENCE_TAGS, PREFERENCE_CATEGORIES } from "./constants";

export interface PreferencesTabProps {
  onSave: () => void;
  isVenueMode?: boolean;
  subscriptionTier?: 'standard' | 'plus' | 'premium' | 'pro';
}

const PreferencesTab = ({ 
  onSave, 
  isVenueMode = false, 
  subscriptionTier = 'standard' 
}: PreferencesTabProps) => {
  const [distanceUnit, setDistanceUnit] = useState("miles");
  const [searchRadius, setSearchRadius] = useState([10]);
  const [showNearbyLocations, setShowNearbyLocations] = useState(true);
  const [autoplayVideos, setAutoplayVideos] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [competitorVenues, setCompetitorVenues] = useState([
    { id: 1, name: "The Corner Bar", tags: ["Cozy", "Lounges", "Date Night"] },
    { id: 2, name: "Downtown Café", tags: ["Cozy", "Locally Owned", "Budget Friendly"] },
    { id: 3, name: "The Luxury Lounge", tags: ["High Energy", "Luxury", "Night Owls"] },
    { id: 4, name: "Family Fun Center", tags: ["Family Friendly", "Budget Friendly", "Physical Adventure"] }
  ]);
  
  // Generate AI suggested tags based on venue type for premium/pro users
  useEffect(() => {
    if (isVenueMode && (subscriptionTier === 'premium' || subscriptionTier === 'pro')) {
      // These would normally be AI-generated based on venue data
      setSuggestedTags([
        "Cozy", 
        "Locally Owned", 
        "Night Owls", 
        "Live Music", 
        "Good for Groups", 
        "Date Night"
      ]);
    }
  }, [isVenueMode, subscriptionTier]);
  
  const handleTagSelect = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  const handleTagRemove = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };
  
  const handleAddCustomTag = () => {
    if (newTag.trim() && !selectedTags.includes(newTag.trim())) {
      setSelectedTags([...selectedTags, newTag.trim()]);
      setNewTag("");
    }
  };
  
  const isTaggingAvailable = () => {
    if (!isVenueMode) return true;
    return subscriptionTier !== 'standard';
  };
  
  const canAddCustomTags = () => {
    if (!isVenueMode) return true;
    return subscriptionTier === 'plus' || subscriptionTier === 'premium' || subscriptionTier === 'pro';
  };
  
  const renderCompetitorTags = () => {
    return (
      <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
        <h4 className="text-sm font-medium flex items-center">
          <Sparkles className="h-4 w-4 mr-2 text-amber-500" />
          Similar Venue Tags for Inspiration
        </h4>
        
        <div className="space-y-3">
          {competitorVenues.map(venue => (
            <div key={venue.id} className="text-xs">
              <p className="font-medium mb-1">{venue.name}</p>
              <div className="flex flex-wrap gap-1">
                {venue.tags.map(tag => (
                  <Badge 
                    key={tag} 
                    variant="outline" 
                    className="cursor-pointer hover:bg-primary/10 text-xs py-0 px-2"
                    onClick={() => handleTagSelect(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  };
  
  return (
    <div className="bg-card p-6 rounded-lg border shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Preferences</h2>
      
      <div className="space-y-6">
        {/* User Preferences Section - Always shown when not in venue mode */}
        {!isVenueMode && (
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">My Preferences</h3>
              <p className="text-sm text-muted-foreground">
                Select tags that match your personal vibe preferences. These will help us recommend venues that match your style.
              </p>
              
              <div className="space-y-2 mt-4">
                <Label>Selected Preferences {selectedTags.length > 0 && `(${selectedTags.length})`}</Label>
                <div className="flex flex-wrap gap-2 min-h-10 p-2 border rounded-md bg-background">
                  {selectedTags.length === 0 ? (
                    <span className="text-sm text-muted-foreground">No preferences selected</span>
                  ) : (
                    selectedTags.map(tag => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => handleTagRemove(tag)}
                        />
                      </Badge>
                    ))
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-tag">Add Custom Preference</Label>
                <div className="flex gap-2">
                  <Input 
                    id="new-tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Enter a custom preference"
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleAddCustomTag}
                    disabled={!newTag.trim()}
                    size="icon"
                  >
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Tag Categories */}
              <div className="space-y-4 mt-4">
                <Label>Popular Preferences</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {PREFERENCE_CATEGORIES.map(category => (
                    <div key={category.id} className="space-y-2">
                      <h4 className="text-sm font-medium flex items-center">
                        <category.icon className="h-4 w-4 mr-2" />
                        {category.name}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {PREFERENCE_TAGS.slice(0, 5).map(tag => (
                          <Badge 
                            key={`${category.id}-${tag}`} 
                            variant="outline" 
                            className={`cursor-pointer hover:bg-primary/10 ${
                              selectedTags.includes(tag) ? "bg-primary/20 border-primary" : ""
                            }`}
                            onClick={() => handleTagSelect(tag)}
                          >
                            {selectedTags.includes(tag) && (
                              <Check className="h-3 w-3 mr-1" />
                            )}
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* All Available Tags */}
              <div className="space-y-2 mt-4">
                <Label>All Available Preferences</Label>
                <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-2 border rounded-md bg-background">
                  {PREFERENCE_TAGS.map(tag => (
                    <Badge 
                      key={tag} 
                      variant="outline" 
                      className={`cursor-pointer hover:bg-primary/10 ${
                        selectedTags.includes(tag) ? "bg-primary/20 border-primary" : ""
                      }`}
                      onClick={() => handleTagSelect(tag)}
                    >
                      {selectedTags.includes(tag) && (
                        <Check className="h-3 w-3 mr-1" />
                      )}
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {isVenueMode && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Venue Tagging</h3>
              
              {subscriptionTier !== 'standard' && (
                <div className="flex items-center">
                  {subscriptionTier === 'plus' && (
                    <Badge variant="outline" className="bg-blue-600/20 text-blue-500 border-blue-300">
                      <Crown className="h-3 w-3 mr-1" /> Plus
                    </Badge>
                  )}
                  {subscriptionTier === 'premium' && (
                    <Badge variant="outline" className="bg-purple-600/20 text-purple-500 border-purple-300">
                      <Crown className="h-3 w-3 mr-1" /> Premium
                    </Badge>
                  )}
                  {subscriptionTier === 'pro' && (
                    <Badge variant="outline" className="bg-amber-600/20 text-amber-500 border-amber-300">
                      <Crown className="h-3 w-3 mr-1" /> Pro
                    </Badge>
                  )}
                </div>
              )}
            </div>
            
            {!isTaggingAvailable() ? (
              <Card className="p-4 bg-muted/20 border-dashed border-2">
                <div className="text-center space-y-2">
                  <h4 className="font-medium">Unlock Venue Tagging</h4>
                  <p className="text-sm text-muted-foreground">
                    Upgrade to Plus or higher to tag your venue with descriptive attributes that help users find you.
                  </p>
                  <Button size="sm" className="mt-2">Upgrade Now</Button>
                </div>
              </Card>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Select tags that describe your venue to help users find you when they search or filter by preferences.
                </p>
                
                {/* AI Suggested Tags for Premium/Pro users */}
                {(subscriptionTier === 'premium' || subscriptionTier === 'pro') && suggestedTags.length > 0 && (
                  <div className="space-y-2">
                    <Label className="flex items-center">
                      <Sparkles className="h-4 w-4 mr-2 text-purple-500" />
                      AI Suggested Tags
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {suggestedTags.map(tag => (
                        <Badge 
                          key={tag} 
                          variant="outline" 
                          className={`cursor-pointer hover:bg-primary/10 ${
                            selectedTags.includes(tag) ? "bg-primary/20 border-primary" : ""
                          }`}
                          onClick={() => handleTagSelect(tag)}
                        >
                          {selectedTags.includes(tag) && (
                            <Check className="h-3 w-3 mr-1" />
                          )}
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Selected Tags */}
                <div className="space-y-2">
                  <Label>Selected Tags {selectedTags.length > 0 && `(${selectedTags.length})`}</Label>
                  <div className="flex flex-wrap gap-2 min-h-10 p-2 border rounded-md bg-background">
                    {selectedTags.length === 0 ? (
                      <span className="text-sm text-muted-foreground">No tags selected</span>
                    ) : (
                      selectedTags.map(tag => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <X 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => handleTagRemove(tag)}
                          />
                        </Badge>
                      ))
                    )}
                  </div>
                </div>
                
                {/* Custom Tag Input */}
                {canAddCustomTags() && (
                  <div className="space-y-2">
                    <Label htmlFor="new-tag">Add Custom Tag</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="new-tag"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Enter a custom tag"
                        className="flex-1"
                      />
                      <Button 
                        onClick={handleAddCustomTag}
                        disabled={!newTag.trim()}
                        size="icon"
                      >
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Tag Categories */}
                <div className="space-y-4 mt-4">
                  <Label>Choose from Popular Tags</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {PREFERENCE_CATEGORIES.map(category => (
                      <div key={category.id} className="space-y-2">
                        <h4 className="text-sm font-medium flex items-center">
                          <category.icon className="h-4 w-4 mr-2" />
                          {category.name}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {PREFERENCE_TAGS.slice(0, 5).map(tag => (
                            <Badge 
                              key={`${category.id}-${tag}`} 
                              variant="outline" 
                              className={`cursor-pointer hover:bg-primary/10 ${
                                selectedTags.includes(tag) ? "bg-primary/20 border-primary" : ""
                              }`}
                              onClick={() => handleTagSelect(tag)}
                            >
                              {selectedTags.includes(tag) && (
                                <Check className="h-3 w-3 mr-1" />
                              )}
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* All Available Tags */}
                <div className="space-y-2 mt-4">
                  <Label>All Available Tags</Label>
                  <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-2 border rounded-md bg-background">
                    {PREFERENCE_TAGS.map(tag => (
                      <Badge 
                        key={tag} 
                        variant="outline" 
                        className={`cursor-pointer hover:bg-primary/10 ${
                          selectedTags.includes(tag) ? "bg-primary/20 border-primary" : ""
                        }`}
                        onClick={() => handleTagSelect(tag)}
                      >
                        {selectedTags.includes(tag) && (
                          <Check className="h-3 w-3 mr-1" />
                        )}
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Competitor Venue Tags (Pro tier only) */}
                {isVenueMode && subscriptionTier === 'pro' && (
                  renderCompetitorTags()
                )}
              </div>
            )}
          </div>
        )}
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Location Settings</h3>
          
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="search-radius">Search Radius ({searchRadius})</Label>
                <span className="text-sm text-muted-foreground">{searchRadius} {distanceUnit}</span>
              </div>
              <Slider
                id="search-radius"
                min={1}
                max={50}
                step={1}
                value={searchRadius}
                onValueChange={setSearchRadius}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="distance-unit">Distance Unit</Label>
              <Select value={distanceUnit} onValueChange={setDistanceUnit}>
                <SelectTrigger id="distance-unit">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="miles">Miles</SelectItem>
                  <SelectItem value="kilometers">Kilometers</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="nearby-locations">Show Nearby Locations</Label>
                <div className="text-xs text-muted-foreground">
                  Display places close to your current location
                </div>
              </div>
              <Switch
                id="nearby-locations"
                checked={showNearbyLocations}
                onCheckedChange={setShowNearbyLocations}
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Content Preferences</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="autoplay">Autoplay Videos</Label>
                <div className="text-xs text-muted-foreground">
                  Automatically play videos in feed
                </div>
              </div>
              <Switch
                id="autoplay"
                checked={autoplayVideos}
                onCheckedChange={setAutoplayVideos}
              />
            </div>
            
            {isVenueMode ? (
              <div className="space-y-2">
                <Label htmlFor="default-post-view">Default Post View</Label>
                <Select defaultValue="grid">
                  <SelectTrigger id="default-post-view">
                    <SelectValue placeholder="Select view" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grid">Grid</SelectItem>
                    <SelectItem value="list">List</SelectItem>
                    <SelectItem value="map">Map</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="content-language">Content Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="content-language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="it">Italian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>
        
        {isVenueMode && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Venue Display Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="featured-posts">Featured Posts</Label>
                  <div className="text-xs text-muted-foreground">
                    Show featured posts at the top of your profile
                  </div>
                </div>
                <Switch
                  id="featured-posts"
                  defaultChecked={true}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="business-category">Business Category</Label>
                <Select defaultValue="restaurant">
                  <SelectTrigger id="business-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="restaurant">Restaurant</SelectItem>
                    <SelectItem value="bar">Bar/Nightlife</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="service">Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
        
        <Button onClick={onSave} className="w-full">Save Preferences</Button>
      </div>
    </div>
  );
};

export default PreferencesTab;
