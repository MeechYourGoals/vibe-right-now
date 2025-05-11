
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SavedCardsSection from "./components/SavedCardsSection";
import AddCardForm from "./components/AddCardForm";
import { CreditCard } from "@/types";
import POSServicesConnector from "@/components/data-insights/POSServicesConnector";

// Mock data for saved cards
const mockCards: CreditCard[] = [
  {
    id: "card_1",
    last4: "4242",
    brand: "visa",
    expMonth: 12,
    expYear: 2025,
    isDefault: true,
    maxSpendLimit: 200,
    vernonApproved: true,
  },
  {
    id: "card_2",
    last4: "1234",
    brand: "mastercard",
    expMonth: 8,
    expYear: 2024,
    isDefault: false,
    maxSpendLimit: 100,
    vernonApproved: false,
  }
];

interface PaymentsTabProps {
  isVenueMode?: boolean;
}

const PaymentsTab = ({ isVenueMode = false }: PaymentsTabProps) => {
  const { toast } = useToast();
  const [cards, setCards] = useState<CreditCard[]>([]);
  const [showAddCard, setShowAddCard] = useState(false);
  const [saveCardsByDefault, setSaveCardsByDefault] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("payment-methods");

  useEffect(() => {
    // In a real app, we would fetch the user's cards from an API
    // For now, we'll use mock data
    const savedCards = localStorage.getItem('saved_cards');
    if (savedCards) {
      setCards(JSON.parse(savedCards));
    } else {
      setCards(mockCards);
      localStorage.setItem('saved_cards', JSON.stringify(mockCards));
    }
  }, []);

  const handleAddCard = (card: Omit<CreditCard, 'id' | 'isDefault'>) => {
    const newCard: CreditCard = {
      ...card,
      id: `card_${Date.now()}`,
      isDefault: cards.length === 0, // Make default if it's the first card
      maxSpendLimit: 100, // Default spend limit
      vernonApproved: false // Default to not approved
    };
    
    const updatedCards = [...cards, newCard];
    setCards(updatedCards);
    localStorage.setItem('saved_cards', JSON.stringify(updatedCards));
    
    toast({
      title: "Card added successfully",
      description: `${card.brand.toUpperCase()} ending in ${card.last4} has been added to your wallet`,
    });
    
    setShowAddCard(false);
  };

  const handleRemoveCard = (cardId: string) => {
    const updatedCards = cards.filter(card => card.id !== cardId);
    
    // If we removed the default card and there are other cards, make the first one default
    if (cards.find(card => card.id === cardId)?.isDefault && updatedCards.length > 0) {
      updatedCards[0].isDefault = true;
    }
    
    setCards(updatedCards);
    localStorage.setItem('saved_cards', JSON.stringify(updatedCards));
    
    toast({
      title: "Card removed",
      description: "The payment method has been removed from your wallet",
    });
  };

  const handleSetDefaultCard = (cardId: string) => {
    const updatedCards = cards.map(card => ({
      ...card,
      isDefault: card.id === cardId
    }));
    
    setCards(updatedCards);
    localStorage.setItem('saved_cards', JSON.stringify(updatedCards));
    
    toast({
      title: "Default card updated",
      description: "Your default payment method has been updated",
    });
  };

  const handleUpdateCard = (updatedCard: CreditCard) => {
    const updatedCards = cards.map(card => 
      card.id === updatedCard.id ? updatedCard : card
    );
    
    setCards(updatedCards);
    localStorage.setItem('saved_cards', JSON.stringify(updatedCards));
    
    toast({
      title: "Card settings updated",
      description: "Your payment method settings have been updated",
    });
  };

  // Render different content based on venue mode
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
      
      {isVenueMode ? (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
            <TabsTrigger value="pos-integrations">POS Integrations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="payment-methods">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-base font-medium">Your Cards</h4>
                  <Badge variant="outline" className="text-xs font-normal">
                    {cards.length} Saved
                  </Badge>
                </div>
                
                {cards.length > 0 ? (
                  <SavedCardsSection 
                    cards={cards}
                    onSetDefault={handleSetDefaultCard}
                    onRemove={handleRemoveCard}
                    onUpdateCard={handleUpdateCard}
                  />
                ) : (
                  <div className="bg-muted rounded-md p-4 text-center text-muted-foreground">
                    <p>No payment methods saved yet.</p>
                  </div>
                )}
                
                {!showAddCard ? (
                  <Button 
                    onClick={() => setShowAddCard(true)} 
                    className="w-full mt-4"
                    variant="outline"
                  >
                    Add New Card
                  </Button>
                ) : (
                  <div className="mt-4 border rounded-md p-4">
                    <AddCardForm 
                      onSubmit={handleAddCard}
                      onCancel={() => setShowAddCard(false)}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pos-integrations">
            <POSServicesConnector />
          </TabsContent>
        </Tabs>
      ) : (
        // Regular user view
        <>
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-base font-medium">Your Cards</h4>
                <Badge variant="outline" className="text-xs font-normal">
                  {cards.length} Saved
                </Badge>
              </div>
              
              {cards.length > 0 ? (
                <SavedCardsSection 
                  cards={cards}
                  onSetDefault={handleSetDefaultCard}
                  onRemove={handleRemoveCard}
                  onUpdateCard={handleUpdateCard}
                />
              ) : (
                <div className="bg-muted rounded-md p-4 text-center text-muted-foreground">
                  <p>No payment methods saved yet.</p>
                </div>
              )}
              
              {!showAddCard ? (
                <Button 
                  onClick={() => setShowAddCard(true)} 
                  className="w-full mt-4"
                  variant="outline"
                >
                  Add New Card
                </Button>
              ) : (
                <div className="mt-4 border rounded-md p-4">
                  <AddCardForm 
                    onSubmit={handleAddCard}
                    onCancel={() => setShowAddCard(false)}
                  />
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h4 className="text-base font-medium mb-4">Payment Preferences</h4>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="save-cards" className="font-medium">Save payment methods by default</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically save new payment methods when making purchases
                    </p>
                  </div>
                  <Switch 
                    id="save-cards" 
                    checked={saveCardsByDefault}
                    onCheckedChange={setSaveCardsByDefault}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default PaymentsTab;
