
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock } from 'lucide-react';
import { UserSubscriptionTier } from '@/types/subscription';

interface FeatureGateProps {
  children: React.ReactNode;
  requiredTier: UserSubscriptionTier;
  currentTier: UserSubscriptionTier;
  featureName: string;
  onUpgrade: (tier: UserSubscriptionTier) => void;
  upgradeMessage?: string;
}

const FeatureGate: React.FC<FeatureGateProps> = ({
  children,
  requiredTier,
  currentTier,
  featureName,
  onUpgrade,
  upgradeMessage
}) => {
  const tierHierarchy = ['free', 'plus', 'premium', 'pro'];
  const hasAccess = tierHierarchy.indexOf(currentTier) >= tierHierarchy.indexOf(requiredTier);

  if (hasAccess) {
    return <>{children}</>;
  }

  const tierDisplayNames = {
    free: 'Free',
    plus: 'Plus',
    premium: 'Premium',
    pro: 'Pro'
  };

  return (
    <Card className="relative">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-2">
          <Lock className="h-6 w-6 text-muted-foreground" />
        </div>
        <CardTitle className="flex items-center justify-center gap-2">
          {featureName}
          <Badge variant="secondary">{tierDisplayNames[requiredTier]} Feature</Badge>
        </CardTitle>
        <CardDescription>
          {upgradeMessage || `Upgrade to ${tierDisplayNames[requiredTier]} to unlock this feature`}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <Button onClick={() => onUpgrade(requiredTier)} className="w-full">
          Upgrade to {tierDisplayNames[requiredTier]}
        </Button>
      </CardContent>
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-lg pointer-events-none" />
    </Card>
  );
};

export default FeatureGate;
