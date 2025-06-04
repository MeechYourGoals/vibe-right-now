
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUserSubscription } from '@/hooks/useUserSubscription';
import { SUBSCRIPTION_PLANS } from '@/types/subscription';
import { Check, Star, Crown, Zap } from "lucide-react";

const SubscriptionTab = () => {
  const { subscription, updateSubscriptionTier, tier } = useUserSubscription();

  const getTierIcon = (tierName: string) => {
    switch (tierName) {
      case 'plus': return <Star className="h-5 w-5" />;
      case 'premium': return <Crown className="h-5 w-5" />;
      case 'pro': return <Zap className="h-5 w-5" />;
      default: return null;
    }
  };

  const getTierColor = (tierName: string) => {
    switch (tierName) {
      case 'plus': return 'border-blue-500/50 bg-blue-950/30';
      case 'premium': return 'border-purple-500/50 bg-purple-950/30';
      case 'pro': return 'border-amber-500/50 bg-gradient-to-br from-amber-950/30 to-orange-950/30';
      default: return 'border-border bg-muted/30';
    }
  };

  const getButtonColor = (tierName: string) => {
    switch (tierName) {
      case 'plus': return 'bg-blue-600 hover:bg-blue-700 text-white';
      case 'premium': return 'bg-purple-600 hover:bg-purple-700 text-white';
      case 'pro': return 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white';
      default: return 'bg-muted hover:bg-muted/80 text-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-foreground">Subscription Plans</h2>
        <p className="text-muted-foreground">
          Choose the plan that best fits your needs. Upgrade or downgrade at any time.
        </p>
      </div>

      {subscription.tier !== 'free' && (
        <Card className="border-green-500/50 bg-green-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Check className="h-5 w-5" />
              Current Subscription
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg text-foreground">
                  {tier.charAt(0).toUpperCase() + tier.slice(1)} Plan
                </h3>
                <p className="text-sm text-muted-foreground">
                  {subscription.expiresAt && `Expires: ${new Date(subscription.expiresAt).toLocaleDateString()}`}
                </p>
              </div>
              <Badge variant="secondary" className="bg-green-900/50 text-green-400 border-green-500/50">
                Active
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SUBSCRIPTION_PLANS.map((plan) => (
          <Card 
            key={plan.tier} 
            className={`relative transition-all duration-300 hover:shadow-lg ${getTierColor(plan.tier)} ${
              tier === plan.tier ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''
            }`}
          >
            {plan.isPopular && (
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white">
                Most Popular
              </Badge>
            )}
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-2 text-foreground">
                {getTierIcon(plan.tier)}
              </div>
              <CardTitle className="text-xl text-foreground">{plan.name}</CardTitle>
              <div className="text-3xl font-bold text-foreground">
                {plan.price === 0 ? 'Free' : `$${plan.price}`}
                {plan.price > 0 && <span className="text-sm font-normal text-muted-foreground">/month</span>}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className={`w-full ${getButtonColor(plan.tier)} transition-colors`}
                onClick={() => updateSubscriptionTier(plan.tier)}
                disabled={tier === plan.tier}
              >
                {tier === plan.tier ? 'Current Plan' : 
                 plan.price === 0 ? 'Downgrade' : 'Upgrade'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Feature Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground">Feature</th>
                  <th className="text-center py-2 text-foreground">Free</th>
                  <th className="text-center py-2 text-foreground">Plus</th>
                  <th className="text-center py-2 text-foreground">Premium</th>
                  <th className="text-center py-2 text-foreground">Pro</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground">Basic Exploration</td>
                  <td className="text-center"><Check className="h-4 w-4 text-green-400 mx-auto" /></td>
                  <td className="text-center"><Check className="h-4 w-4 text-green-400 mx-auto" /></td>
                  <td className="text-center"><Check className="h-4 w-4 text-green-400 mx-auto" /></td>
                  <td className="text-center"><Check className="h-4 w-4 text-green-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground">Enhanced Preferences</td>
                  <td className="text-center text-muted-foreground">-</td>
                  <td className="text-center"><Check className="h-4 w-4 text-green-400 mx-auto" /></td>
                  <td className="text-center"><Check className="h-4 w-4 text-green-400 mx-auto" /></td>
                  <td className="text-center"><Check className="h-4 w-4 text-green-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground">AI Recommendations</td>
                  <td className="text-center text-muted-foreground">-</td>
                  <td className="text-center"><Check className="h-4 w-4 text-green-400 mx-auto" /></td>
                  <td className="text-center"><Check className="h-4 w-4 text-green-400 mx-auto" /></td>
                  <td className="text-center"><Check className="h-4 w-4 text-green-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground">Vibe With Me Mode</td>
                  <td className="text-center text-muted-foreground">-</td>
                  <td className="text-center text-muted-foreground">-</td>
                  <td className="text-center"><Check className="h-4 w-4 text-green-400 mx-auto" /></td>
                  <td className="text-center"><Check className="h-4 w-4 text-green-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground">Vernon Chat</td>
                  <td className="text-center text-muted-foreground">-</td>
                  <td className="text-center text-muted-foreground">-</td>
                  <td className="text-center text-muted-foreground">-</td>
                  <td className="text-center"><Check className="h-4 w-4 text-green-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground">Influencer Marketplace</td>
                  <td className="text-center text-muted-foreground">-</td>
                  <td className="text-center text-muted-foreground">-</td>
                  <td className="text-center text-muted-foreground">-</td>
                  <td className="text-center"><Check className="h-4 w-4 text-green-400 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionTab;
