
import { CreditCard as CardIcon, Check, Trash2 } from "lucide-react";
import { CreditCard } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SavedCardsSectionProps {
  cards: CreditCard[];
  onSetDefault: (cardId: string) => void;
  onRemove: (cardId: string) => void;
}

const SavedCardsSection = ({ cards, onSetDefault, onRemove }: SavedCardsSectionProps) => {
  // Helper function to get card logo/icon based on brand
  const getCardLogo = (brand: string) => {
    // For a real app, you would use actual card brand logos
    return <CardIcon className="h-8 w-8 text-primary" />;
  };

  // Helper function to format expiration date
  const formatExpiration = (month: number, year: number) => {
    return `${month.toString().padStart(2, '0')}/${year.toString().substring(2)}`;
  };

  return (
    <div className="space-y-3">
      {cards.map((card) => (
        <div 
          key={card.id}
          className={`flex items-center justify-between p-3 rounded-md border ${
            card.isDefault ? 'border-primary bg-primary/5' : ''
          }`}
        >
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
      ))}
    </div>
  );
};

export default SavedCardsSection;
