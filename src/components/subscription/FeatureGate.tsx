
import React from 'react';
import { useUserSubscription } from '@/hooks/useUserSubscription';
import { UserSubscriptionTier } from '@/types/subscription';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Star } from "lucide-react";

interface FeatureGateProps {
  children: React.ReactNode;
  requiredTier: UserSubscriptionTier;
  featureName: string;
  description?: string;
  showUpgrade?: boolean;
}

export const FeatureGate: React.FC<FeatureGateProps> = ({
  children,
  requiredTier,
  featureName,
  description,
  showUpgrade = true
}) => {
  const { canAccessFeature, tier } = useUserSubscription();
  
  if (canAccessFeature(requiredTier)) {
    return <>{children}</>;
  }

  if (!showUpgrade) {
    return null;
  }

  const getTierColor = (tier: UserSubscriptionTier) => {
    switch (tier) {
      case 'plus': return 'bg-blue-500';
      case 'premium': return 'bg-purple-500';
      case 'pro': return 'bg-gold-500 bg-gradient-to-r from-amber-400 to-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="border-dashed border-2 border-muted-foreground/25">
      <CardHeader className="text-center pb-4">
        <div className="flex items-center justify-center mb-2">
          <Lock className="h-8 w-8 text-muted-foreground/50" />
        </div>
        <CardTitle className="text-lg">{featureName}</CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      <CardContent className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-sm text-muted-foreground">Requires</span>
          <Badge className={`${getTierColor(requiredTier)} text-white`}>
            <Star className="h-3 w-3 mr-1" />
            {requiredTier.charAt(0).toUpperCase() + requiredTier.slice(1)}
          </Badge>
        </div>
        <Button className="w-full">
          Upgrade to {requiredTier.charAt(0).toUpperCase() + requiredTier.slice(1)}
        </Button>
      </CardContent>
    </Card>
  );
};
