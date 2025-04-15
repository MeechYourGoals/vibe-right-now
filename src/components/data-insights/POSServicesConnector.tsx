
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, PlusCircle, ShoppingCart, CheckCircle, Store, ExternalLink, Settings } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

type POSService = {
  id: string;
  name: string;
  icon: React.ReactNode;
  connected: boolean;
  apiKey?: string;
  accountId?: string;
};

const POSServicesConnector = () => {
  const { toast } = useToast();
  const [posServices, setPosServices] = useState<POSService[]>([
    { id: "square", name: "Square", icon: <CreditCard className="h-5 w-5" />, connected: false },
    { id: "clover", name: "Clover", icon: <ShoppingCart className="h-5 w-5" />, connected: false },
    { id: "toast", name: "Toast", icon: <Store className="h-5 w-5" />, connected: false },
    { id: "shopify", name: "Shopify", icon: <ShoppingCart className="h-5 w-5" />, connected: false },
    { id: "other", name: "Other POS", icon: <CreditCard className="h-5 w-5" />, connected: false },
  ]);
  
  const [currentService, setCurrentService] = useState<POSService | null>(null);
  const [apiKey, setApiKey] = useState("");
  const [accountId, setAccountId] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  
  const handleConnect = (service: POSService) => {
    setCurrentService(service);
    setApiKey(service.apiKey || "");
    setAccountId(service.accountId || "");
  };
  
  const handleSaveConnection = () => {
    if (!currentService) return;
    
    setIsConnecting(true);
    
    // Simulate API connection
    setTimeout(() => {
      const updatedServices = posServices.map(service => 
        service.id === currentService.id 
          ? { ...service, connected: true, apiKey, accountId }
          : service
      );
      
      setPosServices(updatedServices);
      setIsConnecting(false);
      
      toast({
        title: "POS Connected",
        description: `Successfully connected to ${currentService.name}`,
      });
      
      setCurrentService(null);
    }, 1500);
  };
  
  const handleDisconnect = (serviceId: string) => {
    const updatedServices = posServices.map(service => 
      service.id === serviceId 
        ? { ...service, connected: false, apiKey: undefined, accountId: undefined }
        : service
    );
    
    setPosServices(updatedServices);
    
    toast({
      title: "POS Disconnected",
      description: `Connection removed successfully`,
      variant: "destructive",
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          POS System Integration
        </CardTitle>
        <CardDescription>
          Connect your point-of-sale systems to import sales data for deeper insights
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posServices.map(service => (
            <Card key={service.id} className="border">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    {service.icon}
                    <div>
                      <h3 className="font-medium">{service.name}</h3>
                      {service.connected ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <CheckCircle className="h-3 w-3 mr-1" /> Connected
                        </Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">Not connected</span>
                      )}
                    </div>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant={service.connected ? "outline" : "default"} 
                        size="sm"
                        onClick={() => handleConnect(service)}
                      >
                        {service.connected ? (
                          <Settings className="h-4 w-4 mr-1" />
                        ) : (
                          <PlusCircle className="h-4 w-4 mr-1" />
                        )}
                        {service.connected ? "Configure" : "Connect"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{service.connected ? "Configure" : "Connect"} {service.name}</DialogTitle>
                        <DialogDescription>
                          {service.connected 
                            ? "Update your connection settings" 
                            : "Enter your API credentials to connect your POS system"}
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="api-key">API Key</Label>
                          <Input 
                            id="api-key" 
                            value={apiKey} 
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="Enter your API key"
                            className="text-foreground"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="account-id">Account ID</Label>
                          <Input 
                            id="account-id" 
                            value={accountId} 
                            onChange={(e) => setAccountId(e.target.value)}
                            placeholder="Enter your account ID"
                            className="text-foreground"
                          />
                        </div>
                        
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => window.open(`https://${service.id.toLowerCase()}.com/developers`, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View API Documentation
                        </Button>
                      </div>
                      
                      <DialogFooter className="flex justify-between">
                        {service.connected && (
                          <Button
                            variant="destructive"
                            onClick={() => handleDisconnect(service.id)}
                          >
                            Disconnect
                          </Button>
                        )}
                        <div className="flex gap-2">
                          <DialogTrigger asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogTrigger>
                          <Button 
                            onClick={handleSaveConnection}
                            disabled={!apiKey || !accountId || isConnecting}
                          >
                            {isConnecting ? "Connecting..." : "Save"}
                          </Button>
                        </div>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Connected Services</h3>
          {posServices.some(service => service.connected) ? (
            <div className="space-y-3">
              {posServices
                .filter(service => service.connected)
                .map(service => (
                  <div key={service.id} className="flex justify-between items-center p-3 border rounded-md">
                    <div className="flex items-center gap-2">
                      {service.icon}
                      <span>{service.name}</span>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <CheckCircle className="h-3 w-3 mr-1" /> Active
                    </Badge>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center p-6 border rounded-md bg-muted/20">
              <ShoppingCart className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <h4 className="font-medium">No POS Systems Connected</h4>
              <p className="text-sm text-muted-foreground">
                Connect your POS systems to see sales analytics
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default POSServicesConnector;
