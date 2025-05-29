
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RegularUserPayments from "./RegularUserPayments";
import VenuePayments from "./VenuePayments";

const PaymentsTabContent = () => {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="personal">Personal</TabsTrigger>
        <TabsTrigger value="venue">Venue</TabsTrigger>
      </TabsList>
      
      <TabsContent value="personal" className="mt-6">
        <RegularUserPayments />
      </TabsContent>
      
      <TabsContent value="venue" className="mt-6">
        <VenuePayments />
      </TabsContent>
    </Tabs>
  );
};

export default PaymentsTabContent;
