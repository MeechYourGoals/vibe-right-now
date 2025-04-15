
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
  setResultsAvailable: (value: React.SetStateAction<boolean>) => void;
  silenceCallback: () => void;
  stopListening: () => void;
}

export interface UseRecognitionEventHandlersReturn {
  handleRecognitionResult: (event: SpeechRecognitionEvent) => void;
  handleRecognitionEnd: () => void;
  handleRecognitionError: (event: SpeechRecognitionErrorEvent) => void;
  handleSilence: () => void;
  handleAudioProcess: () => void;
  handleAudioEnd: () => void;
  handleNoMatch: () => void;
  handleUpdateTranscript: (text: string) => void;
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
