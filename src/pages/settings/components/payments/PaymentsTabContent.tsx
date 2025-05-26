
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RegularUserPayments from "./RegularUserPayments";
import VenuePayments from "./VenuePayments";

interface PaymentsTabContentProps {
  isVenueMode: boolean;
}

const PaymentsTabContent = ({ isVenueMode }: PaymentsTabContentProps) => {
  const [activeTab, setActiveTab] = useState<string>("payment-methods");

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Payment Settings</h3>
        <p className="text-sm text-muted-foreground">
          {isVenueMode 
            ? "Manage your venue's payment integrations and preferences." 
            : "Manage your payment methods and preferences."}
        </p>
      </div>
      
      {isVenueMode ? (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
            <TabsTrigger value="pos-integrations">POS Integrations</TabsTrigger>
          </TabsList>
          
          <VenuePayments activeTab={activeTab} />
        </Tabs>
      ) : (
        <RegularUserPayments />
      )}
    </div>
  );
};

export default PaymentsTabContent;
