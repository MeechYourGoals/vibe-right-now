
export interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  category: 'discount' | 'freebie' | 'exclusive' | 'experience';
  imageUrl?: string;
  termsAndConditions?: string;
  expirationDate?: Date;
  available: boolean;
}

export interface UserRedemption {
  id: string;
  rewardId: string;
  userId: string;
  redeemedAt: Date;
  status: 'pending' | 'completed' | 'expired';
  code?: string;
}
