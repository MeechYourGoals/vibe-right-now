
import React from 'react';
import { Camera, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TabsContent } from '@/components/ui/tabs';

interface CameraTabProps {
  capturedPhoto: string | null;
  isCapacitorNative: boolean;
  isLoading: boolean;
  onCameraCapture: () => void;
}

const CameraTab: React.FC<CameraTabProps> = ({
  capturedPhoto,
  isCapacitorNative,
  isLoading,
  onCameraCapture
}) => {
  return (
    <TabsContent value="camera" className="space-y-4">
      <div className="bg-muted/30 rounded-lg p-2 aspect-video flex items-center justify-center relative">
        {capturedPhoto ? (
          <img src={capturedPhoto} alt="Captured" className="w-full h-full object-cover rounded" />
        ) : (
          <>
            <Camera className="h-12 w-12 opacity-50" />
            <span className="ml-2 text-sm text-muted-foreground">
              {isCapacitorNative ? "Tap to capture" : "Camera Preview"}
            </span>
          </>
        )}
        {isCapacitorNative && !capturedPhoto && (
          <Button
            onClick={onCameraCapture}
            disabled={isLoading}
            className="absolute inset-0 bg-transparent hover:bg-black/10 border-0"
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          </Button>
        )}
      </div>
      {isCapacitorNative && !capturedPhoto && (
        <Button onClick={onCameraCapture} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Capturing...
            </>
          ) : (
            <>
              <Camera className="h-4 w-4 mr-2" />
              Take Photo
            </>
          )}
        </Button>
      )}
    </TabsContent>
  );
};

export default CameraTab;
