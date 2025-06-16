
import { useState, useCallback } from 'react';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { toast } from 'sonner';

interface CameraOptions {
  source?: CameraSource;
  quality?: number;
  allowEditing?: boolean;
  resultType?: CameraResultType;
}

interface CameraHookResult {
  takePhoto: (options?: CameraOptions) => Promise<Photo | null>;
  selectFromGallery: () => Promise<Photo | null>;
  isCapacitorNative: boolean;
  isLoading: boolean;
  error: string | null;
}

export const useCameraAccess = (): CameraHookResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const isCapacitorNative = Capacitor.isNativePlatform();

  const requestCameraPermissions = async (): Promise<boolean> => {
    try {
      const permissions = await Camera.requestPermissions();
      return permissions.camera === 'granted';
    } catch (err) {
      console.error('Failed to request camera permissions:', err);
      setError('Camera permissions denied');
      return false;
    }
  };

  const takePhoto = useCallback(async (options: CameraOptions = {}): Promise<Photo | null> => {
    if (!isCapacitorNative) {
      toast.error('Camera access is only available on mobile devices');
      return null;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const hasPermission = await requestCameraPermissions();
      if (!hasPermission) {
        throw new Error('Camera permission denied');
      }

      const image = await Camera.getPhoto({
        quality: options.quality || 90,
        allowEditing: options.allowEditing || false,
        resultType: options.resultType || CameraResultType.Uri,
        source: options.source || CameraSource.Camera,
      });

      return image;
    } catch (err: any) {
      console.error('Error taking photo:', err);
      setError(err.message || 'Failed to take photo');
      toast.error('Failed to take photo');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [isCapacitorNative]);

  const selectFromGallery = useCallback(async (): Promise<Photo | null> => {
    if (!isCapacitorNative) {
      toast.error('Gallery access is only available on mobile devices');
      return null;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const hasPermission = await requestCameraPermissions();
      if (!hasPermission) {
        throw new Error('Photos permission denied');
      }

      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos,
      });

      return image;
    } catch (err: any) {
      console.error('Error selecting from gallery:', err);
      setError(err.message || 'Failed to select photo');
      toast.error('Failed to select photo');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [isCapacitorNative]);

  return {
    takePhoto,
    selectFromGallery,
    isCapacitorNative,
    isLoading,
    error
  };
};
