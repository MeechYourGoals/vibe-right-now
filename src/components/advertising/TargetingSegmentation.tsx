import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from 'lucide-react';

interface TargetingOptions {
  demographics: DemographicsTargeting;
  behavioral: BehavioralTargeting;
  geographic: string[];
  contextual: ContextualTargeting;
}

interface DemographicsTargeting {
  education: string[];
  income: string[];
  occupation: string[];
  gender: GenderTargeting;
  ageRange: [number, number];
  interests: string[];
}

type GenderTargeting = 'male' | 'female' | 'all';

interface BehavioralTargeting {
  purchaseHistory: string[];
  appUsage: string[];
  venueVisits: string[];
  socialEngagement: string[];
}

interface ContextualTargeting {
  timeOfDay: string[];
  deviceType: string[];
  vibeTags: string[];
  venueTypes: string[];
  daypart: string[];
  dayOfWeek: string[];
  weather: string[];
  eventTypes: string[];
}

const TargetingSegmentation = () => {
  const [targetingOptions, setTargetingOptions] = useState({
    demographics: {
      education: ['College', 'Graduate'],
      income: ['$50k-75k', '$75k-100k'],
      occupation: ['Professional', 'Student'],
      gender: 'all' as GenderTargeting,
      ageRange: [25, 45] as [number, number],
      interests: ['Food & Dining', 'Nightlife']
    },
    behavioral: {
      purchaseHistory: [],
      appUsage: [],
      venueVisits: [],
      socialEngagement: []
    },
    geographic: ['Downtown', 'Midtown', 'Arts District'],
    contextual: {
      timeOfDay: [],
      deviceType: [],
      vibeTags: [],
      venueTypes: [],
      daypart: [],
      dayOfWeek: [],
      weather: [],
      eventTypes: []
    }
  });

  const addDemographicTarget = (category: string, value: string) => {
    setTargetingOptions(prev => ({
      ...prev,
      demographics: {
        ...prev.demographics,
        [category]: [...prev.demographics[category], value]
      }
    }));
  };

  const removeDemographicTarget = (category: string, value: string) => {
    setTargetingOptions(prev => ({
      ...prev,
      demographics: {
        ...prev.demographics,
        [category]: prev.demographics[category].filter(item => item !== value)
      }
    }));
  };

  const addBehavioralTarget = (category: string, value: string) => {
    setTargetingOptions(prev => ({
      ...prev,
      behavioral: {
        ...prev.behavioral,
        [category]: [...prev.behavioral[category], value]
      }
    }));
  };

  const removeBehavioralTarget = (category: string, value: string) => {
    setTargetingOptions(prev => ({
      ...prev,
      behavioral: {
        ...prev.behavioral,
        [category]: prev.behavioral[category].filter(item => item !== value)
      }
    }));
  };

  const addGeographicTarget = (location: string) => {
    if (location && !targetingOptions.geographic.includes(location)) {
      setTargetingOptions(prev => ({
        ...prev,
        geographic: [...prev.geographic, location]
      }));
    }
  };

  const removeGeographicTarget = (location: string) => {
    setTargetingOptions(prev => ({
      ...prev,
      geographic: prev.geographic.filter(loc => loc !== location)
    }));
  };

  const addContextualTarget = (category: string, value: string) => {
    setTargetingOptions(prev => ({
      ...prev,
      contextual: {
        ...prev.contextual,
        [category]: [...prev.contextual[category], value]
      }
    }));
  };

  const removeContextualTarget = (category: string, value: string) => {
    setTargetingOptions(prev => ({
      ...prev,
      contextual: {
        ...prev.contextual,
        [category]: prev.contextual[category].filter(item => item !== value)
      }
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Targeting Segmentation</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="demographics" className="w-full">
          <TabsList>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
            <TabsTrigger value="geographic">Geographic</TabsTrigger>
            <TabsTrigger value="contextual">Contextual</TabsTrigger>
          </TabsList>
          
          <TabsContent value="geographic" className="space-y-4">
            <div>
              <Label className="text-base font-medium">Geographic Targeting</Label>
              <p className="text-sm text-muted-foreground mb-4">
                Target users based on their location and geographic preferences
              </p>
              
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {targetingOptions.geographic.map((location) => (
                    <Badge 
                      key={location} 
                      variant="secondary" 
                      className="flex items-center gap-1"
                    >
                      {location}
                      <button 
                        onClick={() => removeGeographicTarget(location)}
                        className="ml-1 hover:bg-red-100 rounded-full p-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Input
                    placeholder="Add location (e.g., Downtown, Midtown)"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addGeographicTarget(e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="demographics" className="space-y-4">
            <div>
              <Label className="text-base font-medium">Demographic Targeting</Label>
              <p className="text-sm text-muted-foreground mb-4">
                Target users based on their demographic characteristics
              </p>
              
              {/* Education Targeting */}
              <div className="space-y-4">
                <Label className="text-sm font-medium">Education</Label>
                <div className="flex flex-wrap gap-2">
                  {targetingOptions.demographics.education.map((edu) => (
                    <Badge 
                      key={edu} 
                      variant="secondary" 
                      className="flex items-center gap-1"
                    >
                      {edu}
                      <button 
                        onClick={() => removeDemographicTarget('education', edu)}
                        className="ml-1 hover:bg-red-100 rounded-full p-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Input
                    placeholder="Add education level (e.g., High School, College)"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addDemographicTarget('education', e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Income Targeting */}
              <div className="space-y-4">
                <Label className="text-sm font-medium">Income</Label>
                <div className="flex flex-wrap gap-2">
                  {targetingOptions.demographics.income.map((income) => (
                    <Badge 
                      key={income} 
                      variant="secondary" 
                      className="flex items-center gap-1"
                    >
                      {income}
                      <button 
                        onClick={() => removeDemographicTarget('income', income)}
                        className="ml-1 hover:bg-red-100 rounded-full p-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Input
                    placeholder="Add income range (e.g., $50k-75k)"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addDemographicTarget('income', e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Occupation Targeting */}
              <div className="space-y-4">
                <Label className="text-sm font-medium">Occupation</Label>
                <div className="flex flex-wrap gap-2">
                  {targetingOptions.demographics.occupation.map((occupation) => (
                    <Badge 
                      key={occupation} 
                      variant="secondary" 
                      className="flex items-center gap-1"
                    >
                      {occupation}
                      <button 
                        onClick={() => removeDemographicTarget('occupation', occupation)}
                        className="ml-1 hover:bg-red-100 rounded-full p-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Input
                    placeholder="Add occupation (e.g., Professional, Student)"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addDemographicTarget('occupation', e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="behavioral" className="space-y-4">
            <div>
              <Label className="text-base font-medium">Behavioral Targeting</Label>
              <p className="text-sm text-muted-foreground mb-4">
                Target users based on their online behavior and preferences
              </p>
              
              {/* Purchase History Targeting */}
              <div className="space-y-4">
                <Label className="text-sm font-medium">Purchase History</Label>
                <div className="flex flex-wrap gap-2">
                  {targetingOptions.behavioral.purchaseHistory.map((purchase) => (
                    <Badge 
                      key={purchase} 
                      variant="secondary" 
                      className="flex items-center gap-1"
                    >
                      {purchase}
                      <button 
                        onClick={() => removeBehavioralTarget('purchaseHistory', purchase)}
                        className="ml-1 hover:bg-red-100 rounded-full p-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Input
                    placeholder="Add purchase history (e.g., Online Shopping, Restaurant Visits)"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addBehavioralTarget('purchaseHistory', e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* App Usage Targeting */}
              <div className="space-y-4">
                <Label className="text-sm font-medium">App Usage</Label>
                <div className="flex flex-wrap gap-2">
                  {targetingOptions.behavioral.appUsage.map((app) => (
                    <Badge 
                      key={app} 
                      variant="secondary" 
                      className="flex items-center gap-1"
                    >
                      {app}
                      <button 
                        onClick={() => removeBehavioralTarget('appUsage', app)}
                        className="ml-1 hover:bg-red-100 rounded-full p-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Input
                    placeholder="Add app usage (e.g., Social Media, Food Delivery)"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addBehavioralTarget('appUsage', e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contextual" className="space-y-4">
            <div>
              <Label className="text-base font-medium">Contextual Targeting</Label>
              <p className="text-sm text-muted-foreground mb-4">
                Target users based on the context of their environment and activities
              </p>
              
              {/* Vibe Tags Targeting */}
              <div className="space-y-4">
                <Label className="text-sm font-medium">Vibe Tags</Label>
                <div className="flex flex-wrap gap-2">
                  {targetingOptions.contextual.vibeTags.map((vibe) => (
                    <Badge 
                      key={vibe} 
                      variant="secondary" 
                      className="flex items-center gap-1"
                    >
                      {vibe}
                      <button 
                        onClick={() => removeContextualTarget('vibeTags', vibe)}
                        className="ml-1 hover:bg-red-100 rounded-full p-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Input
                    placeholder="Add vibe tag (e.g., Lively, Relaxed)"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addContextualTarget('vibeTags', e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Venue Types Targeting */}
              <div className="space-y-4">
                <Label className="text-sm font-medium">Venue Types</Label>
                <div className="flex flex-wrap gap-2">
                  {targetingOptions.contextual.venueTypes.map((venueType) => (
                    <Badge 
                      key={venueType} 
                      variant="secondary" 
                      className="flex items-center gap-1"
                    >
                      {venueType}
                      <button 
                        onClick={() => removeContextualTarget('venueTypes', venueType)}
                        className="ml-1 hover:bg-red-100 rounded-full p-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Input
                    placeholder="Add venue type (e.g., Restaurant, Nightclub)"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addContextualTarget('venueTypes', e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TargetingSegmentation;
