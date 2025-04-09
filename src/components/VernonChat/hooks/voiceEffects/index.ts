
// Main entry point that re-exports all voice effect hooks
import { useIntroMessages } from './useIntroMessages';
import { useAiResponseReader } from './useAiResponseReader';
import { useTranscriptProcessor } from './useTranscriptProcessor';
import { useCloseEffects } from './useCloseEffects';

export { 
  useIntroMessages,
  useAiResponseReader,
  useTranscriptProcessor,
  useCloseEffects
};

// Composite hook that combines all voice effect hooks
export { useVoiceEffects } from './useVoiceEffects';
