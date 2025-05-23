
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserConciergeTab from "./UserConciergeTab";
import VenueConciergeTab from "./VenueConciergeTab";

interface VernonConciergeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const VernonConciergeDialog = ({ open, onOpenChange }: VernonConciergeDialogProps) => {
  const [activeTab, setActiveTab] = useState<"user" | "venue">("user");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold vibe-gradient-text">
            Vernon Concierge
          </DialogTitle>
        </DialogHeader>
        
        <Tabs 
          defaultValue="user" 
          value={activeTab} 
          onValueChange={(value) => setActiveTab(value as "user" | "venue")}
          className="w-full mt-4"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="user">For Users</TabsTrigger>
            <TabsTrigger value="venue">For Venues</TabsTrigger>
          </TabsList>
          
          <TabsContent value="user" className="mt-4">
            <UserConciergeTab />
          </TabsContent>
          
          <TabsContent value="venue" className="mt-4">
            <VenueConciergeTab />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default VernonConciergeDialog;
