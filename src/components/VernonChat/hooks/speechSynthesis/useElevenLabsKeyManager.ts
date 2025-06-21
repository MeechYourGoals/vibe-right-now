
import { useCallback } from 'react';
import { DeepgramService } from '@/services';
import { toast } from 'sonner';

export const useElevenLabsKeyManager = (setUseElevenLabs: (value: boolean) => void) => {
  const promptForElevenLabsKey = useCallback((): void => {
    const apiKey = prompt('Enter your Eleven Labs API key for improved voice quality:');
    if (apiKey) {
      DeepgramService.setApiKey(apiKey);
      setUseElevenLabs(true);
      toast.success('Eleven Labs API key saved. Voice quality will be improved.');
    }
  }, [setUseElevenLabs]);

  return { promptForElevenLabsKey };
};
