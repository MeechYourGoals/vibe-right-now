
interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  length: number;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onstart: (event: Event) => void;
  onend: (event: Event) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  start(): void;
  stop(): void;
  abort(): void;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
  prototype: SpeechRecognition;
}

interface SpeechSynthesisEvent extends Event {
  name: string;
  utterance: SpeechSynthesisUtterance;
  charIndex: number;
  charLength: number;
  elapsedTime: number;
  error?: any;
}

interface SpeechSynthesisUtterance extends EventTarget {
  text: string;
  lang: string;
  voice: SpeechSynthesisVoice | null;
  volume: number;
  rate: number;
  pitch: number;
  onstart: (event: SpeechSynthesisEvent) => void;
  onend: (event: SpeechSynthesisEvent) => void;
  onerror: (event: SpeechSynthesisEvent) => void;
  onpause: (event: SpeechSynthesisEvent) => void;
  onresume: (event: SpeechSynthesisEvent) => void;
  onmark: (event: SpeechSynthesisEvent) => void;
  onboundary: (event: SpeechSynthesisEvent) => void;
}

interface SpeechSynthesisUtteranceConstructor {
  new (text?: string): SpeechSynthesisUtterance;
  prototype: SpeechSynthesisUtterance;
}

interface SpeechSynthesisVoice {
  voiceURI: string;
  name: string;
  lang: string;
  localService: boolean;
  default: boolean;
}

interface SpeechSynthesis {
  pending: boolean;
  speaking: boolean;
  paused: boolean;
  onvoiceschanged: (event: Event) => void;
  getVoices(): SpeechSynthesisVoice[];
  speak(utterance: SpeechSynthesisUtterance): void;
  cancel(): void;
  pause(): void;
  resume(): void;
}

interface Window {
  SpeechRecognition: SpeechRecognitionConstructor;
  webkitSpeechRecognition: SpeechRecognitionConstructor;
  SpeechSynthesisUtterance: SpeechSynthesisUtteranceConstructor;
  speechSynthesis: SpeechSynthesis;
}
