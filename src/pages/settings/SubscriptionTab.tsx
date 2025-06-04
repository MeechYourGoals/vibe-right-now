
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
      case 'plus': return 'border-blue-500 bg-blue-50';
      case 'premium': return 'border-purple-500 bg-purple-50';
      case 'pro': return 'border-amber-500 bg-gradient-to-br from-amber-50 to-orange-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getButtonColor = (tierName: string) => {
    switch (tierName) {
      case 'plus': return 'bg-blue-500 hover:bg-blue-600';
      case 'premium': return 'bg-purple-500 hover:bg-purple-600';
      case 'pro': return 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Subscription Plans</h2>
        <p className="text-muted-foreground">
          Choose the plan that best fits your needs. Upgrade or downgrade at any time.
        </p>
      </div>

      {subscription.tier !== 'free' && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Check className="h-5 w-5" />
              Current Subscription
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">
                  {tier.charAt(0).toUpperCase() + tier.slice(1)} Plan
                </h3>
                <p className="text-sm text-muted-foreground">
                  {subscription.expiresAt && `Expires: ${new Date(subscription.expiresAt).toLocaleDateString()}`}
                </p>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
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
            className={`relative ${getTierColor(plan.tier)} ${
              tier === plan.tier ? 'ring-2 ring-offset-2 ring-current' : ''
            }`}
          >
            {plan.isPopular && (
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-500">
                Most Popular
              </Badge>
            )}
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-2">
                {getTierIcon(plan.tier)}
              </div>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <div className="text-3xl font-bold">
                {plan.price === 0 ? 'Free' : `$${plan.price}`}
                {plan.price > 0 && <span className="text-sm font-normal text-muted-foreground">/month</span>}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className={`w-full text-white ${getButtonColor(plan.tier)}`}
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

      <Card>
        <CardHeader>
          <CardTitle>Feature Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Feature</th>
                  <th className="text-center py-2">Free</th>
                  <th className="text-center py-2">Plus</th>
                  <th className="text-center py-2">Premium</th>
                  <th className="text-center py-2">Pro</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b">
                  <td className="py-2">Basic Exploration</td>
                  <td className="text-center"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                  <td className="text-center"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                  <td className="text-center"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                  <td className="text-center"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Enhanced Preferences</td>
                  <td className="text-center">-</td>
                  <td className="text-center"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                  <td className="text-center"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                  <td className="text-center"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">AI Recommendations</td>
                  <td className="text-center">-</td>
                  <td className="text-center"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                  <td className="text-center"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                  <td className="text-center"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Vibe With Me Mode</td>
                  <td className="text-center">-</td>
                  <td className="text-center">-</td>
                  <td className="text-center"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                  <td className="text-center"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Vernon Chat</td>
                  <td className="text-center">-</td>
                  <td className="text-center">-</td>
                  <td className="text-center">-</td>
                  <td className="text-center"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Influencer Marketplace</td>
                  <td className="text-center">-</td>
                  <td className="text-center">-</td>
                  <td className="text-center">-</td>
                  <td className="text-center"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
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
