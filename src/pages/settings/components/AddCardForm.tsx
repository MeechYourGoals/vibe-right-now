
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard } from "@/types";

interface AddCardFormProps {
  onSubmit: (card: Omit<CreditCard, 'id' | 'isDefault'>) => void;
  onCancel: () => void;
}

const AddCardForm = ({ onSubmit, onCancel }: AddCardFormProps) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validation
      if (!cardNumber || cardNumber.length < 13) {
        throw new Error("Invalid card number");
      }
      
      if (!expMonth || parseInt(expMonth) < 1 || parseInt(expMonth) > 12) {
        throw new Error("Invalid expiration month");
      }
      
      if (!expYear || parseInt(expYear) < new Date().getFullYear()) {
        throw new Error("Invalid expiration year");
      }
      
      if (!cvv || cvv.length < 3) {
        throw new Error("Invalid CVV");
      }

      // In a real app, we would send this to a payment processor
      // For this demo, we'll just simulate a successful card addition
      setTimeout(() => {
        const last4 = cardNumber.slice(-4);
        
        // Determine card brand based on first digit (simplified)
        let brand = "unknown";
        const firstDigit = cardNumber.charAt(0);
        if (firstDigit === "4") brand = "visa";
        else if (firstDigit === "5") brand = "mastercard";
        else if (firstDigit === "3") brand = "amex";
        else if (firstDigit === "6") brand = "discover";
        
        onSubmit({
          last4,
          brand,
          expMonth: parseInt(expMonth),
          expYear: parseInt(expYear),
        });
        
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      console.error("Error adding card:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="cardNumber">Card Number</Label>
        <Input
          id="cardNumber"
          placeholder="1234 5678 9012 3456"
          value={cardNumber}
          onChange={(e) => {
            // Allow only numbers and format with spaces
            const value = e.target.value.replace(/\D/g, "");
            const formatted = value.match(/.{1,4}/g)?.join(" ") || value;
            setCardNumber(value);
            e.target.value = formatted;
          }}
          maxLength={19} // 16 digits + 3 spaces
          required
        />
      </div>

      <div>
        <Label htmlFor="cardHolder">Card Holder</Label>
        <Input
          id="cardHolder"
          placeholder="John Doe"
          value={cardHolder}
          onChange={(e) => setCardHolder(e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="expMonth">Month</Label>
          <Input
            id="expMonth"
            placeholder="MM"
            value={expMonth}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setExpMonth(value.slice(0, 2));
            }}
            maxLength={2}
            required
          />
        </div>
        <div>
          <Label htmlFor="expYear">Year</Label>
          <Input
            id="expYear"
            placeholder="YYYY"
            value={expYear}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setExpYear(value.slice(0, 4));
            }}
            maxLength={4}
            required
          />
        </div>
        <div>
          <Label htmlFor="cvv">CVV</Label>
          <Input
            id="cvv"
            placeholder="123"
            value={cvv}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setCvv(value.slice(0, 4));
            }}
            maxLength={4}
            required
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-2">
        <Button 
          type="button" 
          variant="ghost" 
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Card"}
        </Button>
      </div>
    </form>
  );
};

export default AddCardForm;
