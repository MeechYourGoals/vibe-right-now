
import { Tag, Shield, Car, Ticket, User, Building2, CreditCard, Crown } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SettingsTabsProps {
  activeTab: string;
  isVenueMode: boolean;
}

const SettingsTabs = ({ activeTab, isVenueMode }: SettingsTabsProps) => {
  return (
    <div className="mb-6">
      {/* Mobile: Horizontal scrollable tabs */}
      <div className="md:hidden overflow-x-auto pb-2">
        <TabsList className="flex w-max gap-1 min-w-full">
          <TabsTrigger value="preferences" className="flex items-center gap-2 whitespace-nowrap flex-shrink-0 px-3">
            <Tag className="h-4 w-4" />
            <span>Preferences</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2 whitespace-nowrap flex-shrink-0 px-3">
            <Shield className="h-4 w-4" />
            <span>Privacy</span>
          </TabsTrigger>
          {isVenueMode ? (
            <>
              <TabsTrigger value="management" className="flex items-center gap-2 whitespace-nowrap flex-shrink-0 px-3">
                <Building2 className="h-4 w-4" />
                <span>Management</span>
              </TabsTrigger>
              <TabsTrigger value="marketing" className="flex items-center gap-2 whitespace-nowrap flex-shrink-0 px-3">
                <Ticket className="h-4 w-4" />
                <span>Marketing</span>
              </TabsTrigger>
            </>
          ) : (
            <>
              <TabsTrigger value="subscription" className="flex items-center gap-2 whitespace-nowrap flex-shrink-0 px-3">
                <Crown className="h-4 w-4" />
                <span>Subscription</span>
              </TabsTrigger>
              <TabsTrigger value="transportation" className="flex items-center gap-2 whitespace-nowrap flex-shrink-0 px-3">
                <Car className="h-4 w-4" />
                <span>Transportation</span>
              </TabsTrigger>
              <TabsTrigger value="ticketing" className="flex items-center gap-2 whitespace-nowrap flex-shrink-0 px-3">
                <Ticket className="h-4 w-4" />
                <span>Ticketing</span>
              </TabsTrigger>
            </>
          )}
          <TabsTrigger value="payments" className="flex items-center gap-2 whitespace-nowrap flex-shrink-0 px-3">
            <CreditCard className="h-4 w-4" />
            <span>Payments</span>
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2 whitespace-nowrap flex-shrink-0 px-3">
            <User className="h-4 w-4" />
            <span>Account</span>
          </TabsTrigger>
        </TabsList>
      </div>

      {/* Desktop: Grid layout with icons only on smaller screens */}
      <TabsList className="hidden md:grid grid-cols-3 md:grid-cols-8 gap-2 min-w-max md:min-w-0">
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
