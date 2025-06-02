
import { useState } from "react";
import { CreditCard as CardIcon, Check, Trash2, DollarSign, WalletCards } from "lucide-react";
import { CreditCard } from "@/types/subscription";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

interface SavedCardsSectionProps {
  cards: CreditCard[];
  onSetDefault: (cardId: string) => void;
  onRemove: (cardId: string) => void;
  onUpdateCard: (card: CreditCard) => void;
}

const SavedCardsSection = ({ cards, onSetDefault, onRemove, onUpdateCard }: SavedCardsSectionProps) => {
  // Helper function to get card logo/icon based on brand
  const getCardLogo = (brand: string) => {
    // For a real app, you would use actual card brand logos
    return <CardIcon className="h-8 w-8 text-primary" />;
  };

  // Helper function to format expiration date
  const formatExpiration = (month: number, year: number) => {
    return `${month.toString().padStart(2, '0')}/${year.toString().substring(2)}`;
  };

  // Helper function to handle spend limit change
  const handleSpendLimitChange = (card: CreditCard, value: number[]) => {
    onUpdateCard({
      ...card,
      maxSpendLimit: value[0]
    });
  };

  // Helper function to handle Vernon approval toggle
  const handleVernonApprovalChange = (card: CreditCard, approved: boolean) => {
    onUpdateCard({
      ...card,
      vernonApproved: approved
    });
  };

  return (
    <div className="space-y-3">
      {cards.map((card) => (
        <div 
          key={card.id}
          className={`p-3 rounded-md border ${
            card.isDefault ? 'border-primary bg-primary/5' : ''
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              {getCardLogo(card.brand)}
              <div>
                <div className="font-medium">
                  {card.brand.charAt(0).toUpperCase() + card.brand.slice(1)} •••• {card.last4}
                </div>
                <div className="text-xs text-muted-foreground">
                  Expires {formatExpiration(card.expMonth, card.expYear)}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {card.isDefault ? (
                <Badge variant="outline" className="bg-primary/10 border-primary/20">
                  <Check className="h-3 w-3 mr-1" /> Default
                </Badge>
              ) : (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onSetDefault(card.id)}
                  className="text-xs h-8"
                >
                  Set as Default
                </Button>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onRemove(card.id)}
                className="text-destructive h-8"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-4 pt-3 border-t">
            {/* Max Spend Limit Setting */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  Transaction Limit
                </Label>
                <span className="text-sm font-medium">
                  ${card.maxSpendLimit || 0}
                </span>
              </div>
              <Slider
                value={[card.maxSpendLimit || 0]}
                min={0}
                max={1000}
                step={10}
                onValueChange={(value) => handleSpendLimitChange(card, value)}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$0</span>
                <span>$500</span>
                <span>$1000</span>
              </div>
            </div>
            
            {/* Vernon AI Approval Toggle */}
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor={`vernon-approval-${card.id}`} className="flex items-center gap-1">
                <WalletCards className="h-4 w-4" />
                <span>Approve for Vernon AI</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="ml-1 cursor-help text-muted-foreground text-xs">(?)</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      Allow Vernon AI to make purchases with this card within the transaction limit
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Switch
                id={`vernon-approval-${card.id}`}
                checked={card.vernonApproved || false}
                onCheckedChange={(checked) => handleVernonApprovalChange(card, checked)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavedCardsSection;
