
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, LightbulbIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import SelectedTagsList from "./SelectedTagsList";
import CustomTagInput from "./CustomTagInput";
import PreferenceTagSelection from "./PreferenceTagSelection";
import CategoryTagSection from "./CategoryTagSection";

interface VenueTaggingSectionProps {
  selectedTags: string[];
  suggestedTags: string[];
  subscriptionTier: 'standard' | 'plus' | 'premium' | 'pro';
  onTagSelect: (tag: string) => void;
  onTagRemove: (tag: string) => void;
  onAddCustomTag: (tag: string) => void;
  preferenceCategories: {
    name: string;
    icon: React.ElementType;
    id: string;
  }[];
  preferenceTags: any;
  renderCompetitorTags: () => React.ReactNode;
}

const VenueTaggingSection = ({
  selectedTags,
  suggestedTags,
  subscriptionTier,
  onTagSelect,
  onTagRemove,
  onAddCustomTag,
  preferenceCategories,
  preferenceTags,
  renderCompetitorTags
}: VenueTaggingSectionProps) => {
  const [showCompetitorTags, setShowCompetitorTags] = useState(false);
  
  // Convert preferenceTags object to array for PreferenceTagSelection
  const allTags: string[] = [];
  
  // Make sure preferenceTags is an object and not undefined
  if (preferenceTags && typeof preferenceTags === 'object') {
    if (!Array.isArray(preferenceTags)) {
      Object.values(preferenceTags).forEach(categoryTags => {
        if (Array.isArray(categoryTags)) {
          allTags.push(...categoryTags);
        }
      });
    } else {
      allTags.push(...preferenceTags);
    }
  }
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Venue Vibe Tags</h3>
        <p className="text-sm text-muted-foreground">
          Select tags that best describe your venue's vibe. These will help users discover your venue based on their preferences.
        </p>
        
        <SelectedTagsList
          selectedTags={selectedTags}
          onTagRemove={onTagRemove}
        />
        
        <CustomTagInput
          onAddTag={onAddCustomTag}
        />
        
        {(subscriptionTier === 'premium' || subscriptionTier === 'pro') && suggestedTags.length > 0 && (
          <div className="mt-4">
            <Label className="mb-2 flex items-center">
              <LightbulbIcon className="h-4 w-4 mr-1 text-yellow-500" />
              AI-Suggested Tags
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
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {(subscriptionTier === 'premium' || subscriptionTier === 'pro') && (
          <div className="mt-4">
            <Label className="flex items-center mb-2">
              <span className="cursor-pointer" onClick={() => setShowCompetitorTags(!showCompetitorTags)}>
                Competitor Tags {showCompetitorTags ? '(hide)' : '(show)'}
              </span>
            </Label>
            {showCompetitorTags && renderCompetitorTags()}
          </div>
        )}
        
        {subscriptionTier === 'standard' && (
          <Alert className="mt-4 bg-muted">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              Upgrade to Premium or Pro to access AI-suggested tags and competitor analysis.
            </AlertDescription>
          </Alert>
        )}
        
        <CategoryTagSection
          categories={preferenceCategories}
          tags={preferenceTags}
          selectedTags={selectedTags}
          onTagSelect={onTagSelect}
        />
        
        <PreferenceTagSelection
          selectedTags={selectedTags}
          availableTags={allTags}
          onTagSelect={onTagSelect}
          onTagRemove={onTagRemove}
        />
      </div>
    </div>
  );
};

export default VenueTaggingSection;
