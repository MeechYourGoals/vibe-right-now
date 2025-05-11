
import { Separator } from "@/components/ui/separator";
import PaymentsTabContent from "./components/payments/PaymentsTabContent";

interface PaymentsTabProps {
  isVenueMode?: boolean;
}

const PaymentsTab = ({ isVenueMode = false }: PaymentsTabProps) => {
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
      
      <Separator />
      
      <PaymentsTabContent isVenueMode={isVenueMode} />
    </div>
  );
};

export default PaymentsTab;
