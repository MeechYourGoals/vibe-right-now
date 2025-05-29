
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard } from "@/types/CreditCard";
import SavedCardsSection from "./SavedCardsSection";
import AddCardForm from "../AddCardForm";

const VenuePayments = () => {
  const [cards, setCards] = useState<CreditCard[]>([
    {
      id: "1",
      lastFour: "4242",
      brand: "Visa",
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true,
      maxSpendLimit: 2000,
      vernonApproved: true
    },
    {
      id: "2",
      lastFour: "5555", 
      brand: "Mastercard",
      expiryMonth: 8,
      expiryYear: 2024,
      isDefault: false,
      maxSpendLimit: 1000,
      vernonApproved: false
    }
  ]);

  const [showAddCard, setShowAddCard] = useState(false);

  const addCard = (newCard: Omit<CreditCard, "id" | "isDefault">) => {
    const card: CreditCard = {
      ...newCard,
      id: (cards.length + 1).toString(),
      isDefault: cards.length === 0
    };
    setCards([...cards, card]);
    setShowAddCard(false);
  };

  const removeCard = (cardId: string) => {
    setCards(cards.filter(card => card.id !== cardId));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Venue Payment Methods</CardTitle>
        </CardHeader>
        <CardContent>
          {showAddCard ? (
            <AddCardForm 
              onAddCard={addCard}
              onCancel={() => setShowAddCard(false)}
            />
          ) : (
            <div className="space-y-4">
              <SavedCardsSection 
                cards={cards}
                onRemoveCard={removeCard}
              />
              <Button onClick={() => setShowAddCard(true)}>
                Add New Card
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VenuePayments;
