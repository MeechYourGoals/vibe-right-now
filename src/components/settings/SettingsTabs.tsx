
import { Tag, Shield, Car, Ticket, User, Building2, CreditCard, Crown } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SettingsTabsProps {
  activeTab: string;
  isVenueMode: boolean;
}

const SettingsTabs = ({ activeTab, isVenueMode }: SettingsTabsProps) => {
  return (
    <TabsList className="mb-6 w-full overflow-x-auto scrollbar-none">
      <div className="flex flex-nowrap gap-1 min-w-max px-1">
        <TabsTrigger value="preferences" className="flex items-center gap-2 whitespace-nowrap flex-shrink-0">
          <Tag className="h-4 w-4" />
          <span className="hidden sm:inline">Preferences</span>
          <span className="sm:hidden">Prefs</span>
        </TabsTrigger>
        <TabsTrigger value="privacy" className="flex items-center gap-2 whitespace-nowrap flex-shrink-0">
          <Shield className="h-4 w-4" />
          <span className="hidden sm:inline">Privacy</span>
          <span className="sm:hidden">Privacy</span>
        </TabsTrigger>
        {isVenueMode ? (
          <>
            <TabsTrigger value="management" className="flex items-center gap-2 whitespace-nowrap flex-shrink-0">
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">Management</span>
              <span className="sm:hidden">Mgmt</span>
            </TabsTrigger>
            <TabsTrigger value="marketing" className="flex items-center gap-2 whitespace-nowrap flex-shrink-0">
              <Ticket className="h-4 w-4" />
              <span className="hidden sm:inline">Marketing</span>
              <span className="sm:hidden">Market</span>
            </TabsTrigger>
          </>
        ) : (
          <>
            <TabsTrigger value="subscription" className="flex items-center gap-2 whitespace-nowrap flex-shrink-0">
              <Crown className="h-4 w-4" />
              <span className="hidden sm:inline">Subscription</span>
              <span className="sm:hidden">Sub</span>
            </TabsTrigger>
            <TabsTrigger value="transportation" className="flex items-center gap-2 whitespace-nowrap flex-shrink-0">
              <Car className="h-4 w-4" />
              <span className="hidden sm:inline">Transportation</span>
              <span className="sm:hidden">Transit</span>
            </TabsTrigger>
            <TabsTrigger value="ticketing" className="flex items-center gap-2 whitespace-nowrap flex-shrink-0">
              <Ticket className="h-4 w-4" />
              <span className="hidden sm:inline">Ticketing</span>
              <span className="sm:hidden">Tix</span>
            </TabsTrigger>
          </>
        )}
        <TabsTrigger value="payments" className="flex items-center gap-2 whitespace-nowrap flex-shrink-0">
          <CreditCard className="h-4 w-4" />
          <span className="hidden sm:inline">Payments</span>
          <span className="sm:hidden">Pay</span>
        </TabsTrigger>
        <TabsTrigger value="account" className="flex items-center gap-2 whitespace-nowrap flex-shrink-0">
          <User className="h-4 w-4" />
          <span className="hidden sm:inline">Account</span>
          <span className="sm:hidden">Account</span>
        </TabsTrigger>
      </div>
    </TabsList>
  );
};

export default SettingsTabs;
