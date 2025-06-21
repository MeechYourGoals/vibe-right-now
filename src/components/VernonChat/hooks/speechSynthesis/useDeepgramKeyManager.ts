
import { useCallback } from 'react';
import { DeepgramService } from '@/services/DeepgramService';
import { toast } from 'sonner';

export const useDeepgramKeyManager = (setUseDeepgram: (value: boolean) => void) => {
  const promptForDeepgramKey = useCallback((): void => {
    const apiKey = prompt('Enter your Deepgram API key for improved voice quality:');
    if (apiKey) {
      DeepgramService.setApiKey(apiKey);
      setUseDeepgram(true);
      toast.success('Deepgram API key saved. Voice quality will be improved.');
    }
  }, [setUseDeepgram]);

  return { promptForDeepgramKey };
};
