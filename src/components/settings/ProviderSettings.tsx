
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { availableProviders, Provider, updateProviderStatus } from '@/services/MultiProviderSystem';

const ProviderSettings = () => {
  const [providers, setProviders] = useState<Provider[]>(availableProviders);
  const [activeTab, setActiveTab] = useState<string>('all');
  
  // Save provider statuses to localStorage whenever they change
  useEffect(() => {
    const statuses = Object.fromEntries(providers.map(p => [p.id, p.isAvailable]));
    localStorage.setItem('mcp-provider-statuses', JSON.stringify(statuses));
  }, [providers]);
  
  const handleProviderToggle = (id: string, newStatus: boolean) => {
    updateProviderStatus(id, newStatus);
    setProviders(prev => prev.map(p => 
      p.id === id ? { ...p, isAvailable: newStatus } : p
    ));
    
    toast.success(`${newStatus ? 'Enabled' : 'Disabled'} ${providers.find(p => p.id === id)?.name || id}`);
  };
  
  const filterProvidersByType = (type: string) => {
    if (type === 'all') return providers;
    if (type === 'search') return providers.filter(p => p.type === 'search' || p.type === 'both');
    if (type === 'chat') return providers.filter(p => p.type === 'chat' || p.type === 'both');
    return providers;
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Provider Settings</CardTitle>
        <CardDescription>
          Configure which AI and search providers are active in the system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Providers</TabsTrigger>
            <TabsTrigger value="search">Search Providers</TabsTrigger>
            <TabsTrigger value="chat">Chat Providers</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="space-y-4">
            {filterProvidersByType(activeTab).map((provider) => (
              <div 
                key={provider.id} 
                className="flex items-center justify-between py-2 border-b last:border-0 last:pb-0"
              >
                <div>
                  <h3 className="font-medium">{provider.name}</h3>
                  <p className="text-sm text-muted-foreground">{provider.description}</p>
                  <div className="text-xs text-muted-foreground mt-1">
                    Type: {provider.type === 'both' ? 'Search & Chat' : provider.type === 'search' ? 'Search' : 'Chat'} | 
                    Priority: {provider.priority}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor={`provider-${provider.id}`} className="text-sm">
                    {provider.isAvailable ? 'Enabled' : 'Disabled'}
                  </Label>
                  <Switch 
                    id={`provider-${provider.id}`}
                    checked={provider.isAvailable}
                    onCheckedChange={(checked) => handleProviderToggle(provider.id, checked)}
                  />
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProviderSettings;
