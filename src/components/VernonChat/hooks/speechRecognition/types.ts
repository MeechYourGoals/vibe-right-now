
// Speech recognition types
export interface SpeechRecognitionState {
  isListening: boolean;
  isProcessing: boolean;
  transcript: string;
  interimTranscript: string;
}

export interface SpeechRecognitionActions {
  setIsListening: (value: boolean) => void;
  setIsProcessing: (value: boolean) => void;
  setTranscript: (value: string) => void;
  setInterimTranscript: (value: string) => void;
}

export interface SpeechRecognitionHookReturn {
  isListening: boolean;
  isProcessing: boolean;
  setIsProcessing: (value: boolean) => void;
  transcript: string;
  interimTranscript: string;
  startListening: () => void;
  stopListening: () => void;
  processTranscript: () => string;
}
