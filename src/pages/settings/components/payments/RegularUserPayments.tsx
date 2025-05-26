
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard } from "@/types";
import AddCardForm from '../AddCardForm';

const RegularUserPayments = () => {
  const [cards, setCards] = useState<CreditCard[]>([
    {
      id: '1',
      lastFour: '1234',
      brand: 'Visa',
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true,
      maxSpendLimit: 1000,
      vernonApproved: true
    },
    {
      id: '2',
      lastFour: '5678',
      brand: 'Mastercard',
      expiryMonth: 8,
      expiryYear: 2026,
      isDefault: false,
      maxSpendLimit: 500,
      vernonApproved: false
    }
  ]);

  const handleAddCard = (newCard: Omit<CreditCard, "id" | "isDefault">) => {
    const card: CreditCard = {
      ...newCard,
      id: Math.random().toString(36).substr(2, 9),
      isDefault: cards.length === 0
    };
    setCards(prev => [...prev, card]);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>Manage your payment methods for Vernon bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cards.map((card) => (
              <div key={card.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-sm">
                    <p className="font-medium">{card.brand} •••• {card.lastFour}</p>
                    <p className="text-muted-foreground">
                      Expires {card.expiryMonth}/{card.expiryYear}
                    </p>
                  </div>
                  {card.isDefault && (
                    <Badge variant="secondary">Default</Badge>
                  )}
                  {card.vernonApproved && (
                    <Badge variant="default">Vernon Approved</Badge>
                  )}
                </div>
                <Button variant="outline" size="sm">
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AddCardForm onAddCard={handleAddCard} />
    </div>
  );
};

export default RegularUserPayments;
