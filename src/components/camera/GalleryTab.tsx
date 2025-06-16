
import React from 'react';
import { Camera, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TabsContent } from '@/components/ui/tabs';

interface GalleryTabProps {
  capturedPhoto: string | null;
  isCapacitorNative: boolean;
  isLoading: boolean;
  onGallerySelect: () => void;
}

const GalleryTab: React.FC<GalleryTabProps> = ({
  capturedPhoto,
  isCapacitorNative,
  isLoading,
  onGallerySelect
}) => {
  return (
    <TabsContent value="gallery" className="space-y-4">
      <div className="bg-muted/30 rounded-lg p-4 aspect-video flex items-center justify-center">
        {capturedPhoto ? (
          <img src={capturedPhoto} alt="Selected" className="w-full h-full object-cover rounded" />
        ) : (
          <div className="text-center">
            <Camera className="h-12 w-12 opacity-50 mx-auto mb-2" />
            <span className="text-sm text-muted-foreground">
              {isCapacitorNative ? "Select from gallery" : "Gallery access on mobile only"}
            </span>
          </div>
        )}
      </div>
      {isCapacitorNative && (
        <Button onClick={onGallerySelect} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Selecting...
            </>
          ) : (
            "Select from Gallery"
          )}
        </Button>
      )}
      {!isCapacitorNative && (
        <p className="text-xs text-muted-foreground text-center">
          Gallery uploads available on mobile app
        </p>
      )}
    </TabsContent>
  );
};

export default GalleryTab;
