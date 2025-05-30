
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard } from "@/types";
import { toast } from "sonner";

interface AddCardFormProps {
  onAddCard: (card: Omit<CreditCard, "id" | "isDefault">) => void;
}

const AddCardForm: React.FC<AddCardFormProps> = ({ onAddCard }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!cardNumber || !expiryDate || !cvv || !name) {
      toast.error('Please fill in all fields');
      return;
    }

    // Parse expiry date (MM/YY format)
    const [month, year] = expiryDate.split('/');
    if (!month || !year) {
      toast.error('Invalid expiry date format (MM/YY)');
      return;
    }

    // Get last 4 digits and determine brand
    const lastFour = cardNumber.slice(-4);
    const brand = getBrandFromNumber(cardNumber);

    const newCard: Omit<CreditCard, "id" | "isDefault"> = {
      lastFour,
      brand,
      expiryMonth: parseInt(month, 10),
      expiryYear: parseInt(`20${year}`, 10),
      maxSpendLimit: 1000,
      vernonApproved: false
    };

    onAddCard(newCard);
    
    // Reset form
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
    setName('');
    
    toast.success('Card added successfully!');
  };

  const getBrandFromNumber = (number: string): string => {
    const firstDigit = number.charAt(0);
    if (firstDigit === '4') return 'Visa';
    if (firstDigit === '5') return 'Mastercard';
    if (firstDigit === '3') return 'Amex';
    return 'Unknown';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Card</CardTitle>
        <CardDescription>Add a new payment method to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Cardholder Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
            />
          </div>
          
          <div>
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
              placeholder="1234 5678 9012 3456"
              maxLength={16}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input
                id="expiry"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="MM/YY"
                maxLength={5}
              />
            </div>
            
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                placeholder="123"
                maxLength={4}
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full">
            Add Card
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddCardForm;
