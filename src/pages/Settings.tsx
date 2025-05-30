
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import PreferencesTab from "./settings/PreferencesTab";
import PaymentsTabContent from "./settings/components/payments/PaymentsTabContent";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("preferences");

  const handleSave = () => {
    console.log("Settings saved");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Settings</h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
            </TabsList>
            
            <TabsContent value="preferences" className="mt-6">
              <PreferencesTab 
                onSave={handleSave}
                isVenueMode={false}
                subscriptionTier="standard"
              />
            </TabsContent>
            
            <TabsContent value="payments" className="mt-6">
              <PaymentsTabContent />
            </TabsContent>
            
            <TabsContent value="notifications" className="mt-6">
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">Notifications Settings</h3>
                <p className="text-muted-foreground">Coming soon...</p>
              </div>
            </TabsContent>
            
            <TabsContent value="privacy" className="mt-6">
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">Privacy Settings</h3>
                <p className="text-muted-foreground">Coming soon...</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Settings;
