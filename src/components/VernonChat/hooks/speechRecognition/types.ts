
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
  recognition: SpeechRecognition | null;
  setTranscript: (value: React.SetStateAction<string>) => void;
  setInterimTranscript: (value: React.SetStateAction<string>) => void;
  setIsListening: (value: React.SetStateAction<boolean>) => void;
  isListening: boolean;
  restartAttempts: number;
  previousInterims: Map<string, number>;
  resetSilenceTimer: () => void;
}
