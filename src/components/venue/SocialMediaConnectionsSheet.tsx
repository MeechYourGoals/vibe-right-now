
import React from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { SocialMediaApiKeys } from "@/services/socialMedia/types";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export interface SocialMediaConnectionsSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const SocialMediaConnectionsSheet: React.FC<SocialMediaConnectionsSheetProps> = ({
  isOpen,
  onClose
}) => {
  const [apiKeys, setApiKeys] = useLocalStorage<SocialMediaApiKeys>('social_media_keys', {
    instagram: '',
    yelp: '',
    google: '',
    tiktok: '',
    tripadvisor: '',
    foursquare: '',
    franki: '',
    other: '',
    otherUrl: ''
  });

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="bg-neutral-900 border-neutral-700">
        <SheetHeader>
          <SheetTitle className="text-white">Connect Social Media Platforms</SheetTitle>
          <SheetDescription className="text-neutral-400">
            Connect your social media accounts to display content
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <p className="text-neutral-300">Platform connections will be configured here.</p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SocialMediaConnectionsSheet;
