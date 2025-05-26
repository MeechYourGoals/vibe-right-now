
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard } from "@/types/CreditCard";

interface AddCardFormProps {
  onAddCard: (card: Omit<CreditCard, "id" | "isDefault">) => void;
  onCancel: () => void;
}

const AddCardForm = ({ onAddCard, onCancel }: AddCardFormProps) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse expiry date
    const [month, year] = expiryDate.split('/').map(Number);
    
    // Determine brand from card number (simplified)
    let brand = "Unknown";
    if (cardNumber.startsWith('4')) brand = "Visa";
    else if (cardNumber.startsWith('5')) brand = "Mastercard";
    else if (cardNumber.startsWith('3')) brand = "Amex";
    
    onAddCard({
      lastFour: cardNumber.slice(-4),
      brand,
      expiryMonth: month,
      expiryYear: 2000 + year
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="cardNumber">Card Number</Label>
        <Input
          id="cardNumber"
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="1234 5678 9012 3456"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="expiryDate">Expiry Date</Label>
          <Input
            id="expiryDate"
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="MM/YY"
            required
          />
        </div>
        <div>
          <Label htmlFor="cvv">CVV</Label>
          <Input
            id="cvv"
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="123"
            required
          />
        </div>
      </div>
      <div>
        <Label htmlFor="name">Cardholder Name</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          required
        />
      </div>
      <div className="flex gap-2">
        <Button type="submit">Add Card</Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AddCardForm;
