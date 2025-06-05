
import React from 'react';
import { CreditCard } from '@/types';

const mockCreditCards: CreditCard[] = [
  {
    id: '1',
    last4: '4242',
    brand: 'Visa',
    expiryMonth: 12,
    expiryYear: 2025,
    isDefault: true,
    maxSpendLimit: 1000,
    vernonApproved: true
  },
  {
    id: '2',
    last4: '5555',
    brand: 'Mastercard',
    expiryMonth: 8,
    expiryYear: 2026,
    isDefault: false,
    maxSpendLimit: 750,
    vernonApproved: false
  }
];

const VenuePayments: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Venue Payment Methods</h3>
      <div className="grid gap-4">
        {mockCreditCards.map((card) => (
          <div key={card.id} className="p-4 border rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{card.brand} •••• {card.last4}</p>
                <p className="text-sm text-muted-foreground">
                  Expires {card.expiryMonth.toString().padStart(2, '0')}/{card.expiryYear}
                </p>
              </div>
              {card.isDefault && (
                <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                  Default
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VenuePayments;
