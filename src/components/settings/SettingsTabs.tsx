
import { Tag, Shield, Car, Ticket, User, Building2, CreditCard, Crown } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SettingsTabsProps {
  activeTab: string;
  isVenueMode: boolean;
}

const SettingsTabs = ({ activeTab, isVenueMode }: SettingsTabsProps) => {
  return (
    <div className="mb-6 overflow-x-auto">
      <TabsList className="grid grid-cols-3 md:grid-cols-8 gap-2 min-w-max md:min-w-0">
        <TabsTrigger value="preferences" className="flex items-center gap-2 whitespace-nowrap">
          <Tag className="h-4 w-4" />
          <span className="hidden md:inline">Preferences</span>
        </TabsTrigger>
        <TabsTrigger value="privacy" className="flex items-center gap-2 whitespace-nowrap">
          <Shield className="h-4 w-4" />
          <span className="hidden md:inline">Privacy</span>
        </TabsTrigger>
        {isVenueMode ? (
          <>
            <TabsTrigger value="management" className="flex items-center gap-2 whitespace-nowrap">
              <Building2 className="h-4 w-4" />
              <span className="hidden md:inline">Management</span>
            </TabsTrigger>
            <TabsTrigger value="marketing" className="flex items-center gap-2 whitespace-nowrap">
              <Ticket className="h-4 w-4" />
              <span className="hidden md:inline">Marketing</span>
            </TabsTrigger>
          </>
        ) : (
          <>
            <TabsTrigger value="subscription" className="flex items-center gap-2 whitespace-nowrap">
              <Crown className="h-4 w-4" />
              <span className="hidden md:inline">Subscription</span>
            </TabsTrigger>
            <TabsTrigger value="transportation" className="flex items-center gap-2 whitespace-nowrap">
              <Car className="h-4 w-4" />
              <span className="hidden md:inline">Transportation</span>
            </TabsTrigger>
            <TabsTrigger value="ticketing" className="flex items-center gap-2 whitespace-nowrap">
              <Ticket className="h-4 w-4" />
              <span className="hidden md:inline">Ticketing</span>
            </TabsTrigger>
          </>
        )}
        <TabsTrigger value="payments" className="flex items-center gap-2 whitespace-nowrap">
          <CreditCard className="h-4 w-4" />
          <span className="hidden md:inline">Payments</span>
        </TabsTrigger>
        <TabsTrigger value="account" className="flex items-center gap-2 whitespace-nowrap">
          <User className="h-4 w-4" />
          <span className="hidden md:inline">Account</span>
        </TabsTrigger>
      </TabsList>
    </div>
  );
};

export default SettingsTabs;
