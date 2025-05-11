
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { CreditCard } from "@/types";
import SavedCardsSection from "./SavedCardsSection";
import AddCardForm from "../AddCardForm";
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

interface VenuePaymentsProps {
  activeTab: string;
}

const VenuePayments = ({ activeTab }: VenuePaymentsProps) => {
  const { toast } = useToast();
  const [cards, setCards] = useState<CreditCard[]>([]);
  const [showAddCard, setShowAddCard] = useState(false);

  useEffect(() => {
    // In a real app, we would fetch the venue's cards from an API
    // For now, we'll use mock data
    const savedCards = localStorage.getItem('venue_saved_cards');
    if (savedCards) {
      setCards(JSON.parse(savedCards));
    } else {
      setCards(mockCards);
      localStorage.setItem('venue_saved_cards', JSON.stringify(mockCards));
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
    localStorage.setItem('venue_saved_cards', JSON.stringify(updatedCards));
    
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
    localStorage.setItem('venue_saved_cards', JSON.stringify(updatedCards));
    
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
    localStorage.setItem('venue_saved_cards', JSON.stringify(updatedCards));
    
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
    localStorage.setItem('venue_saved_cards', JSON.stringify(updatedCards));
    
    toast({
      title: "Card settings updated",
      description: "Your payment method settings have been updated",
    });
  };

  return (
    <>
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
    </>
  );
};

export default VenuePayments;
