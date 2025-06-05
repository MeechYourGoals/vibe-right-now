
import React from 'react';
import { CreditCard } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const mockCreditCards: CreditCard[] = [
  {
    id: '1',
    last4: '4242',
    brand: 'Visa',
    expiryMonth: 12,
    expiryYear: 2025,
    isDefault: true,
    maxSpendLimit: 500,
    vernonApproved: true
  },
  {
    id: '2',
    last4: '5555',
    brand: 'Mastercard',
    expiryMonth: 8,
    expiryYear: 2026,
    isDefault: false,
    maxSpendLimit: 300,
    vernonApproved: false
  }
];

const SavedCardsSection: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Saved Payment Methods</h3>
        <Button variant="outline" size="sm">Add Card</Button>
      </div>
      
      <div className="grid gap-4">
        {mockCreditCards.map((card) => (
          <Card key={card.id} className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{card.brand} •••• {card.last4}</p>
                <p className="text-sm text-muted-foreground">
                  Expires {card.expiryMonth.toString().padStart(2, '0')}/{card.expiryYear}
                </p>
                {card.maxSpendLimit && (
                  <p className="text-xs text-muted-foreground">
                    Max spend: ${card.maxSpendLimit}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                {card.isDefault && (
                  <Badge variant="default" className="text-xs">
                    Default
                  </Badge>
                )}
                {card.vernonApproved && (
                  <Badge variant="secondary" className="text-xs">
                    Vernon Approved
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SavedCardsSection;
