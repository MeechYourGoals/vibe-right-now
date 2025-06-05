
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard } from '@/types';

interface AddCardFormProps {
  onAddCard: (card: Omit<CreditCard, 'id' | 'isDefault'>) => void;
}

const AddCardForm: React.FC<AddCardFormProps> = ({ onAddCard }) => {
  const [formData, setFormData] = useState({
    last4: '',
    brand: '',
    expiryMonth: 1,
    expiryYear: new Date().getFullYear()
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCard({
      last4: formData.last4,
      brand: formData.brand,
      expiryMonth: formData.expiryMonth,
      expiryYear: formData.expiryYear
    });
    
    // Reset form
    setFormData({
      last4: '',
      brand: '',
      expiryMonth: 1,
      expiryYear: new Date().getFullYear()
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="last4">Last 4 Digits</Label>
        <Input
          id="last4"
          value={formData.last4}
          onChange={(e) => setFormData({ ...formData, last4: e.target.value })}
          maxLength={4}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="brand">Card Brand</Label>
        <Input
          id="brand"
          value={formData.brand}
          onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="expiryMonth">Month</Label>
          <Input
            id="expiryMonth"
            type="number"
            min="1"
            max="12"
            value={formData.expiryMonth}
            onChange={(e) => setFormData({ ...formData, expiryMonth: parseInt(e.target.value) })}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="expiryYear">Year</Label>
          <Input
            id="expiryYear"
            type="number"
            min={new Date().getFullYear()}
            value={formData.expiryYear}
            onChange={(e) => setFormData({ ...formData, expiryYear: parseInt(e.target.value) })}
            required
          />
        </div>
      </div>
      
      <Button type="submit">Add Card</Button>
    </form>
  );
};

export default AddCardForm;
