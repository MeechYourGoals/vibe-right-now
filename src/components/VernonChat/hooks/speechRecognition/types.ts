
export interface SpeechRecognitionHookReturn {
  isListening: boolean;
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
  transcript: string;
  interimTranscript: string;
  startListening: () => void;
  stopListening: () => void;
  processTranscript: () => Promise<string>;
  isPushToTalkActive?: boolean;
  handlePushToTalkStart?: () => void;
  handlePushToTalkEnd?: () => void;
}

export interface UseRecognitionSetupReturn {
  speechRecognition: SpeechRecognition | null;
  initialized: boolean;
  restartAttempts: number;
  previousInterims: Map<string, number>;
  useLocalWhisper: boolean;
  mediaRecorder: MediaRecorder | null;
  audioChunks: Blob[];
}

export interface UseListeningControlsProps {
  speechRecognition: SpeechRecognition | null;
  initialized: boolean;
  isListening: boolean;
  setIsListening: (listening: boolean) => void;
  setIsProcessing: (processing: boolean) => void;
  setTranscript: (transcript: string) => void;
  setInterimTranscript: (interimTranscript: string) => void;
  restartAttempts: number;
  clearSilenceTimer: () => void;
  useLocalWhisper: boolean;
  mediaRecorder: MediaRecorder | null;
  audioChunks: Blob[];
  processAudioWithOpenRouter?: (audio: Blob) => Promise<string>;
}

export interface UseRecognitionEventHandlersProps {
  speechRecognition: SpeechRecognition | null;
  setTranscript: (transcript: string) => void;
  setInterimTranscript: (interimTranscript: string) => void;
  setIsListening: (listening: boolean) => void;
  isListening: boolean;
  restartAttempts: number;
  previousInterims: Map<string, number>;
  resetSilenceTimer: () => void;
}

export interface UseSilenceDetectionProps {
  onSilenceDetected: () => void;
  silenceThreshold?: number;
}

export interface UseTranscriptProcessorParams {
  transcript: string;
  setTranscript: (transcript: string) => void;
  setIsProcessing: (processing: boolean) => void;
  setInterimTranscript: (interimTranscript: string) => void;
}

export interface UseTranscriptProcessorReturn {
  processTranscript: () => Promise<string>;
}
