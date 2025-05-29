// src/components/advertiser/AdvertiserTab.tsx
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdvertiserDashboard from './AdvertiserDashboard';
import AdCreationStudio from './AdCreationStudio';
import TargetingSegmentation from './TargetingSegmentation';
import AdvertiserReporting from './AdvertiserReporting';

const AdvertiserTab: React.FC = () => {
  return (
    <Tabs defaultValue="dashboard" className="w-full">
      <TabsList>
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="adCreation">Ad Creation Studio</TabsTrigger>
        <TabsTrigger value="targeting">Targeting & Segmentation</TabsTrigger>
        <TabsTrigger value="reporting">Reporting & Analytics</TabsTrigger>
      </TabsList>
      <TabsContent value="dashboard">
        <AdvertiserDashboard />
      </TabsContent>
      <TabsContent value="adCreation">
        <AdCreationStudio />
      </TabsContent>
      <TabsContent value="targeting">
        <TargetingSegmentation />
      </TabsContent>
      <TabsContent value="reporting">
        <AdvertiserReporting />
      </TabsContent>
    </Tabs>
  );
};

export default AdvertiserTab;
