
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

interface ApiKeyTabSwitcherProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ApiKeyTabSwitcher: React.FC<ApiKeyTabSwitcherProps> = ({ 
  activeTab, 
  onTabChange 
}) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="content">Content Platforms</TabsTrigger>
        <TabsTrigger value="integrations">Review Platforms</TabsTrigger>
      </TabsList>
      
      <TabsContent value="content" className="space-y-4 pt-4">
        <Alert className="bg-blue-500/10 border-blue-500/30 text-blue-700">
          <Info className="h-4 w-4" />
          <AlertDescription className="text-xs">
            Connect social media platforms to automatically fetch content posted about this venue
          </AlertDescription>
        </Alert>
      </TabsContent>
      
      <TabsContent value="integrations" className="space-y-4 pt-4">
        <Alert className="bg-blue-500/10 border-blue-500/30 text-blue-700">
          <Info className="h-4 w-4" />
          <AlertDescription className="text-xs">
            Connect review platforms to gather visitor reviews and ratings about this venue
          </AlertDescription>
        </Alert>
      </TabsContent>
    </Tabs>
  );
};

export default ApiKeyTabSwitcher;
