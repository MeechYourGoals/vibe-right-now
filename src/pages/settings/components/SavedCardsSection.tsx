
import { CreditCard } from "@/types/CreditCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";

interface SavedCardsSectionProps {
  cards: CreditCard[];
  onRemoveCard: (cardId: string) => void;
}

const SavedCardsSection = ({ cards, onRemoveCard }: SavedCardsSectionProps) => {
  if (cards.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No payment methods added yet
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {cards.map((card) => (
        <Card key={card.id} className="relative">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center text-white text-xs font-bold">
                  {card.brand.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium">•••• •••• •••• {card.lastFour}</p>
                  <p className="text-sm text-muted-foreground">
                    Expires {card.expiryMonth.toString().padStart(2, '0')}/{card.expiryYear}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {card.isDefault && (
                  <Badge variant="secondary">Default</Badge>
                )}
                {card.vernonApproved && (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Vernon Approved
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveCard(card.id)}
                  className="h-8 w-8 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SavedCardsSection;
