
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Shield, 
  Car, 
  Ticket, 
  CreditCard, 
  Settings,
  Building2,
  Megaphone,
  Upload,
  Crown
} from "lucide-react";

interface SettingsTabsProps {
  activeTab: string;
  isVenueMode: boolean;
}

const SettingsTabs = ({ activeTab, isVenueMode }: SettingsTabsProps) => {
  return (
    <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 mb-6">
      <TabsTrigger value="preferences" className="flex items-center gap-2">
        <User className="h-4 w-4" />
        <span className="hidden sm:inline">Preferences</span>
      </TabsTrigger>
      
      <TabsTrigger value="privacy" className="flex items-center gap-2">
        <Shield className="h-4 w-4" />
        <span className="hidden sm:inline">Privacy</span>
      </TabsTrigger>
      
      {!isVenueMode && (
        <TabsTrigger value="subscription" className="flex items-center gap-2">
          <Crown className="h-4 w-4" />
          <span className="hidden sm:inline">Subscription</span>
        </TabsTrigger>
      )}
      
      {isVenueMode ? (
        <>
          <TabsTrigger value="management" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            <span className="hidden sm:inline">Management</span>
          </TabsTrigger>
          
          <TabsTrigger value="marketing" className="flex items-center gap-2">
            <Megaphone className="h-4 w-4" />
            <span className="hidden sm:inline">Marketing</span>
          </TabsTrigger>
          
          <TabsTrigger value="submission" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            <span className="hidden sm:inline">Submit Venue</span>
          </TabsTrigger>
        </>
      ) : (
        <>
          <TabsTrigger value="transportation" className="flex items-center gap-2">
            <Car className="h-4 w-4" />
            <span className="hidden sm:inline">Transportation</span>
          </TabsTrigger>
          
          <TabsTrigger value="ticketing" className="flex items-center gap-2">
            <Ticket className="h-4 w-4" />
            <span className="hidden sm:inline">Ticketing</span>
          </TabsTrigger>
        </>
      )}
      
      <TabsTrigger value="payments" className="flex items-center gap-2">
        <CreditCard className="h-4 w-4" />
        <span className="hidden sm:inline">Payments</span>
      </TabsTrigger>
      
      <TabsTrigger value="account" className="flex items-center gap-2">
        <Settings className="h-4 w-4" />
        <span className="hidden sm:inline">Account</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default SettingsTabs;
