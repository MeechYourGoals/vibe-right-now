
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCardType, getRedemptionOpportunities, getAiRecommendation, RedemptionOpportunity } from "@/utils/creditCardRedemption";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { CreditCard, Hotel, MapPin, Ticket, Calendar, Award } from "lucide-react";

interface CreditCardPointsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreditCardPointsDialog = ({ open, onOpenChange }: CreditCardPointsDialogProps) => {
  const [selectedCards, setSelectedCards] = useState<CreditCardType[]>(["amex", "chase"]);
  const [destination, setDestination] = useState("");
  const [pointBudget, setPointBudget] = useState<number | "">("");
  const [valueOriented, setValueOriented] = useState(true);
  const [venueType, setVenueType] = useState("");
  const [tab, setTab] = useState("ai");
  
  // Get redemption opportunities based on selected cards
  const allOpportunities = getRedemptionOpportunities(selectedCards);
  
  // Get AI-recommended opportunities based on preferences
  const recommendedOpportunities = getAiRecommendation(allOpportunities, {
    destination,
    pointBudget: pointBudget === "" ? undefined : Number(pointBudget),
    valueOriented,
    venueType
  });
  
  // Helper function to toggle credit card selection
  const toggleCard = (card: CreditCardType) => {
    if (selectedCards.includes(card)) {
      setSelectedCards(selectedCards.filter(c => c !== card));
    } else {
      setSelectedCards([...selectedCards, card]);
    }
  };
  
  // Function to handle a redemption request
  const handleRedeemRequest = (opportunity: RedemptionOpportunity) => {
    toast.success(`Successfully requested redemption at ${opportunity.location.name}`);
    toast(`We'll email you confirmation details shortly`, {
      description: `${opportunity.pointsRequired.toLocaleString()} points will be deducted from your ${opportunity.creditCard} account upon confirmation.`
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Redeem Credit Card Points</DialogTitle>
          <DialogDescription>
            Find the best places to redeem your credit card points for maximum value
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="ai">AI Recommendations</TabsTrigger>
            <TabsTrigger value="all">All Opportunities</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ai" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="destination">Destination (optional)</Label>
                <Input 
                  id="destination" 
                  placeholder="City or state" 
                  value={destination} 
                  onChange={e => setDestination(e.target.value)} 
                />
              </div>
              <div>
                <Label htmlFor="pointBudget">Point Budget (optional)</Label>
                <Input 
                  id="pointBudget" 
                  type="number" 
                  placeholder="Maximum points to spend" 
                  value={pointBudget} 
                  onChange={e => setPointBudget(e.target.value ? Number(e.target.value) : "")} 
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Label className="w-full mb-1">Your Credit Cards</Label>
              <Badge 
                variant={selectedCards.includes("amex") ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleCard("amex")}
              >
                <CreditCard className="h-3 w-3 mr-1" /> American Express
              </Badge>
              <Badge 
                variant={selectedCards.includes("chase") ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleCard("chase")}
              >
                <CreditCard className="h-3 w-3 mr-1" /> Chase
              </Badge>
              <Badge 
                variant={selectedCards.includes("capital_one") ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleCard("capital_one")}
              >
                <CreditCard className="h-3 w-3 mr-1" /> Capital One
              </Badge>
              <Badge 
                variant={selectedCards.includes("citi") ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleCard("citi")}
              >
                <CreditCard className="h-3 w-3 mr-1" /> Citi
              </Badge>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="valueOriented" 
                  checked={valueOriented} 
                  onCheckedChange={(checked) => setValueOriented(checked as boolean)} 
                />
                <Label htmlFor="valueOriented">Prioritize best point value</Label>
              </div>
              
              <div>
                <Label htmlFor="venueType">Venue Type (optional)</Label>
                <Select value={venueType} onValueChange={setVenueType}>
                  <SelectTrigger id="venueType">
                    <SelectValue placeholder="Any venue type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any type</SelectItem>
                    <SelectItem value="attraction">Attractions</SelectItem>
                    <SelectItem value="event">Events</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="restaurant">Restaurants</SelectItem>
                    <SelectItem value="bar">Bars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="pt-4">
              <h3 className="font-medium text-lg mb-3">
                AI Recommended Redemptions
                {recommendedOpportunities.length > 0 && (
                  <span className="text-sm font-normal text-muted-foreground ml-2">
                    Found {recommendedOpportunities.length} matches
                  </span>
                )}
              </h3>
              
              {recommendedOpportunities.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Award className="h-10 w-10 mx-auto mb-3 opacity-50" />
                  <p>No redemption opportunities match your criteria</p>
                  <p className="text-sm mt-1">Try selecting different cards or adjusting your preferences</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recommendedOpportunities.slice(0, 5).map((opportunity) => (
                    <OpportunityCard 
                      key={`${opportunity.location.id}-${opportunity.creditCard}`}
                      opportunity={opportunity}
                      onRedeem={handleRedeemRequest}
                    />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="all" className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Label className="w-full mb-1">Filter by Card</Label>
              <Badge 
                variant={selectedCards.includes("amex") ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleCard("amex")}
              >
                <CreditCard className="h-3 w-3 mr-1" /> American Express
              </Badge>
              <Badge 
                variant={selectedCards.includes("chase") ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleCard("chase")}
              >
                <CreditCard className="h-3 w-3 mr-1" /> Chase
              </Badge>
              <Badge 
                variant={selectedCards.includes("capital_one") ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleCard("capital_one")}
              >
                <CreditCard className="h-3 w-3 mr-1" /> Capital One
              </Badge>
              <Badge 
                variant={selectedCards.includes("citi") ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleCard("citi")}
              >
                <CreditCard className="h-3 w-3 mr-1" /> Citi
              </Badge>
            </div>
            
            <div className="pt-2">
              <h3 className="font-medium text-lg mb-3">
                All Redemption Opportunities
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  {allOpportunities.length} available
                </span>
              </h3>
              
              {allOpportunities.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <CreditCard className="h-10 w-10 mx-auto mb-3 opacity-50" />
                  <p>No redemption opportunities found</p>
                  <p className="text-sm mt-1">Try selecting different credit cards</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {allOpportunities.slice(0, 10).map((opportunity) => (
                    <OpportunityCard 
                      key={`${opportunity.location.id}-${opportunity.creditCard}`}
                      opportunity={opportunity}
                      onRedeem={handleRedeemRequest}
                    />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

// Helper component to display a redemption opportunity
interface OpportunityCardProps {
  opportunity: RedemptionOpportunity;
  onRedeem: (opportunity: RedemptionOpportunity) => void;
}

const OpportunityCard = ({ opportunity, onRedeem }: OpportunityCardProps) => {
  const { location, creditCard, pointsRequired, cashValue, valueRatio, specialOffer, expiryDate } = opportunity;
  
  const getCardColor = (card: CreditCardType) => {
    switch (card) {
      case "amex": return "bg-blue-50 border-blue-200 text-blue-700";
      case "chase": return "bg-indigo-50 border-indigo-200 text-indigo-700";
      case "capital_one": return "bg-green-50 border-green-200 text-green-700";
      case "mastercard": return "bg-orange-50 border-orange-200 text-orange-700";
      case "visa": return "bg-sky-50 border-sky-200 text-sky-700";
      case "discover": return "bg-amber-50 border-amber-200 text-amber-700";
      case "citi": return "bg-violet-50 border-violet-200 text-violet-700";
      default: return "bg-gray-50 border-gray-200 text-gray-700";
    }
  };
  
  const formatCardName = (card: CreditCardType): string => {
    switch (card) {
      case "amex": return "American Express";
      case "capital_one": return "Capital One";
      default: return card.charAt(0).toUpperCase() + card.slice(1);
    }
  };
  
  const getVenueIcon = () => {
    // Fixed: Using only valid location types
    if (location.name.toLowerCase().includes("hotel") || location.name.toLowerCase().includes("resort")) {
      return <Hotel className="h-5 w-5" />;
    }
    
    switch (location.type) {
      case "attraction":
        return <MapPin className="h-5 w-5" />;
      case "event":
      case "sports":
        return <Ticket className="h-5 w-5" />;
      default:
        return <MapPin className="h-5 w-5" />;
    }
  };
  
  return (
    <Card className="overflow-hidden">
      <div className="flex h-full">
        <div className={`w-2 ${getCardColor(creditCard)}`}></div>
        <div className="flex-1">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-base md:text-lg">{location.name}</CardTitle>
                <CardDescription className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" /> 
                  {location.city}, {location.state}
                </CardDescription>
              </div>
              <Badge className={getCardColor(creditCard)}>
                <CreditCard className="h-3 w-3 mr-1" />
                {formatCardName(creditCard)}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="pb-2">
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div>
                <div className="text-muted-foreground text-xs">Points Required</div>
                <div className="font-medium">{pointsRequired.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-muted-foreground text-xs">Cash Value</div>
                <div className="font-medium">${cashValue}</div>
              </div>
              <div>
                <div className="text-muted-foreground text-xs">Value (¢/point)</div>
                <div className="font-medium">{valueRatio}</div>
              </div>
            </div>
            
            {specialOffer && (
              <div className="mt-3 text-sm bg-amber-50 text-amber-800 border border-amber-200 rounded-md p-2">
                <div className="flex items-center gap-1">
                  <Award className="h-4 w-4 flex-shrink-0" />
                  <span>{specialOffer}</span>
                </div>
                
                {expiryDate && (
                  <div className="text-xs mt-1 flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    Offer expires: {expiryDate.toLocaleDateString()}
                  </div>
                )}
              </div>
            )}
          </CardContent>
          
          <CardFooter className="pt-0">
            <Button 
              variant="outline" 
              size="sm" 
              className="mr-2" 
              onClick={() => onRedeem(opportunity)}
            >
              Redeem Points
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(`/venue/${location.id}`, '_blank')}
            >
              View Details
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default CreditCardPointsDialog;
