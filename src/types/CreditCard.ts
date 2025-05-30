
export interface CreditCard {
  id: string;
  lastFour: string;
  expiryMonth: number;
  expiryYear: number;
  brand: string;
  isDefault: boolean;
  maxSpendLimit?: number;
  vernonApproved?: boolean;
}
