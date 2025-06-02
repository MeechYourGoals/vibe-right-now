
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Check, Crown, Zap, Brain, Sparkles } from 'lucide-react';
import { useUserSubscription } from '@/hooks/useUserSubscription';
import { UserSubscriptionTier } from '@/types/subscription';

const SubscriptionTab = () => {
  const { subscription, getCurrentPlan, upgradeTo, plans } = useUserSubscription();
  const currentPlan = getCurrentPlan();

  const getIcon = (tier: UserSubscriptionTier) => {
    switch (tier) {
      case 'free': return <Sparkles className="h-5 w-5" />;
      case 'plus': return <Zap className="h-5 w-5" />;
      case 'premium': return <Crown className="h-5 w-5" />;
      case 'pro': return <Brain className="h-5 w-5" />;
    }
  };

  const getGradient = (tier: UserSubscriptionTier) => {
    switch (tier) {
      case 'plus': return 'from-blue-500 to-purple-600';
      case 'premium': return 'from-purple-600 to-pink-600';
      case 'pro': return 'from-pink-600 to-red-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getIcon(subscription.tier)}
            Current Plan: {currentPlan.name}
          </CardTitle>
          <CardDescription>
            {subscription.tier === 'free' 
              ? 'You are currently on the free plan'
              : `$${currentPlan.price}/month • Next billing: ${subscription.currentPeriodEnd.toLocaleDateString()}`
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {currentPlan.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Available Plans */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Available Plans</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <Card key={plan.id} className={`relative ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
              {plan.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2" variant="default">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center pb-2">
                <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r ${getGradient(plan.id)} text-white mb-2`}>
                  {getIcon(plan.id)}
                </div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="text-2xl font-bold">
                  {plan.price === 0 ? 'Free' : `$${plan.price}`}
                  {plan.price > 0 && <span className="text-sm font-normal text-muted-foreground">/month</span>}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <Separator />
                <Button 
                  className="w-full" 
                  variant={subscription.tier === plan.id ? "secondary" : "default"}
                  disabled={subscription.tier === plan.id}
                  onClick={() => upgradeTo(plan.id)}
                >
                  {subscription.tier === plan.id ? 'Current Plan' : 
                   plan.price === 0 ? 'Downgrade' : 'Upgrade'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Billing Information */}
      {subscription.tier !== 'free' && (
        <Card>
          <CardHeader>
            <CardTitle>Billing Information</CardTitle>
            <CardDescription>Manage your subscription and billing details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Billing Cycle</span>
              <Badge variant="outline">{subscription.billingCycle}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Status</span>
              <Badge variant={subscription.status === 'active' ? 'default' : 'destructive'}>
                {subscription.status}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Next Payment</span>
              <span>{subscription.currentPeriodEnd.toLocaleDateString()}</span>
            </div>
            <Separator />
            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                Update Payment Method
              </Button>
              <Button variant="outline" className="w-full text-destructive">
                Cancel Subscription
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SubscriptionTab;
