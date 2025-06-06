
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Heart, Award } from "lucide-react";

interface ProfileTabsProps {
  activeTab?: string;
  onTabChange?: (value: string) => void;
}

const ProfileTabs = ({ 
  activeTab = "posts", 
  onTabChange 
}: ProfileTabsProps) => {
  return (
    <Tabs 
      defaultValue="posts" 
      value={activeTab} 
      onValueChange={onTabChange} 
      className="mb-6"
    >
      <TabsList className="grid grid-cols-4 w-full max-w-md">
        <TabsTrigger value="posts">
          <div className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            <span>Posts</span>
          </div>
        </TabsTrigger>
        <TabsTrigger value="places">
          <div className="flex items-center">
            <span>Places</span>
          </div>
        </TabsTrigger>
        <TabsTrigger value="venues">
          <div className="flex items-center">
            <span>Venues</span>
          </div>
        </TabsTrigger>
        <TabsTrigger value="about">
          <div className="flex items-center">
            <span>About</span>
          </div>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ProfileTabs;
