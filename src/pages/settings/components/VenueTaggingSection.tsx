
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Crown, Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import SelectedTagsList from "./SelectedTagsList";
import CustomTagInput from "./CustomTagInput";
import CategoryTagSection from "./CategoryTagSection";
import PreferenceTagSelection from "./PreferenceTagSelection";

interface VenueTaggingSectionProps {
  subscriptionTier: 'standard' | 'plus' | 'premium' | 'pro';
  selectedTags: string[];
  suggestedTags: string[];
  onTagSelect: (tag: string) => void;
  onTagRemove: (tag: string) => void;
  onAddCustomTag: (tag: string) => void;
  preferenceCategories: {
    name: string;
    icon: React.ElementType;
    id: string;
  }[];
  preferenceTags: string[];
  renderCompetitorTags?: () => React.ReactNode;
}

const VenueTaggingSection = ({
  subscriptionTier,
  selectedTags,
  suggestedTags,
  onTagSelect,
  onTagRemove,
  onAddCustomTag,
  preferenceCategories,
  preferenceTags,
  renderCompetitorTags
}: VenueTaggingSectionProps) => {
  const isTaggingAvailable = () => {
    return subscriptionTier !== 'standard';
  };
  
  const canAddCustomTags = () => {
    return subscriptionTier === 'plus' || subscriptionTier === 'premium' || subscriptionTier === 'pro';
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Venue Tagging</h3>
        
        {subscriptionTier !== 'standard' && (
          <div className="flex items-center">
            {subscriptionTier === 'plus' && (
              <Badge variant="outline" className="bg-blue-600/20 text-blue-500 border-blue-300">
                <Crown className="h-3 w-3 mr-1" /> Plus
              </Badge>
            )}
            {subscriptionTier === 'premium' && (
              <Badge variant="outline" className="bg-purple-600/20 text-purple-500 border-purple-300">
                <Crown className="h-3 w-3 mr-1" /> Premium
              </Badge>
            )}
            {subscriptionTier === 'pro' && (
              <Badge variant="outline" className="bg-amber-600/20 text-amber-500 border-amber-300">
                <Crown className="h-3 w-3 mr-1" /> Pro
              </Badge>
            )}
          </div>
        )}
      </div>
      
      {!isTaggingAvailable() ? (
        <Card className="p-4 bg-muted/20 border-dashed border-2">
          <div className="text-center space-y-2">
            <h4 className="font-medium">Unlock Venue Tagging</h4>
            <p className="text-sm text-muted-foreground">
              Upgrade to Plus or higher to tag your venue with descriptive attributes that help users find you.
            </p>
            <Button size="sm" className="mt-2">Upgrade Now</Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Select tags that describe your venue to help users find you when they search or filter by preferences.
          </p>
          
          {/* AI Suggested Tags for Premium/Pro users */}
          {(subscriptionTier === 'premium' || subscriptionTier === 'pro') && suggestedTags.length > 0 && (
            <div className="space-y-2">
              <Label className="flex items-center">
                <Sparkles className="h-4 w-4 mr-2 text-purple-500" />
                AI Suggested Tags
              </Label>
              <div className="flex flex-wrap gap-2">
                {suggestedTags.map(tag => (
                  <Badge 
                    key={tag} 
                    variant="outline" 
                    className={`cursor-pointer hover:bg-primary/10 ${
                      selectedTags.includes(tag) ? "bg-primary/20 border-primary" : ""
                    }`}
                    onClick={() => onTagSelect(tag)}
                  >
                    {selectedTags.includes(tag) && (
                      <Check className="h-3 w-3 mr-1" />
                    )}
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          <SelectedTagsList
            selectedTags={selectedTags}
            onTagRemove={onTagRemove}
          />
          
          {canAddCustomTags() && (
            <CustomTagInput
              onAddTag={onAddCustomTag}
              label="Add Custom Tag"
              placeholder="Enter a custom tag"
            />
          )}
          
          <CategoryTagSection
            categories={preferenceCategories}
            tags={preferenceTags}
            selectedTags={selectedTags}
            onTagSelect={onTagSelect}
          />
          
          <PreferenceTagSelection
            selectedTags={selectedTags}
            availableTags={preferenceTags}
            onTagSelect={onTagSelect}
            onTagRemove={onTagRemove}
          />
          
          {/* Competitor Venue Tags (Pro tier only) */}
          {subscriptionTier === 'pro' && renderCompetitorTags && renderCompetitorTags()}
        </div>
      )}
    </div>
  );
};

export default VenueTaggingSection;
