
import { toast } from 'sonner';

// Voice selection utilities
export const getPreferredVoice = (voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined => {
  // Try to find a good male English voice with natural sounding characteristics
  const preferredVoices = [
    'Google UK English Male',
    'Microsoft David - English (United States)',
    'Microsoft Mark - English (United States)',
    'Alex',  // macOS voice
  ];
  
  // Look for one of our preferred voices first
  let naturalVoice = voices.find(voice => 
    preferredVoices.some(preferred => voice.name.includes(preferred))
  );
  
  // If none of our preferred voices are found, look for a good male English voice
  if (!naturalVoice) {
    naturalVoice = voices.find(
      voice => voice.lang.includes('en') && 
               (voice.name.includes('Male') || 
                voice.name.includes('Daniel') || 
                voice.name.includes('David') || 
                voice.name.includes('James') || 
                voice.name.includes('George'))
    );
  }
  
  // If no specific male voice found, fallback to any English voice
  if (!naturalVoice) {
    naturalVoice = voices.find(
      voice => voice.lang.includes('en')
    );
  }
  
  return naturalVoice;
};

// Process text to make it sound more natural
export const processTextForNaturalSpeech = (text: string): string => {
  // Remove HTML tags first
  let processedText = text.replace(/<[^>]*>/g, '');
  
  // Remove strong tags and other formatting that might cause issues
  processedText = processedText.replace(/<\/?strong>/g, '');
  processedText = processedText.replace(/\*\*/g, '');
  
  // Replace patterns that might appear in search results
  const categories = ['Live Entertainment', 'Nightlife', 'Food', 'Restaurants', 'Events', 'Attractions'];
  categories.forEach(category => {
    // Remove patterns like "<strong>Category</strong>: " or "Category: "
    const patternWithTags = new RegExp(`<strong>${category}<\/strong>:\\s*`, 'gi');
    const patternWithoutTags = new RegExp(`${category}:\\s*`, 'gi');
    
    processedText = processedText.replace(patternWithTags, '');
    processedText = processedText.replace(patternWithoutTags, '');
  });
  
  // Convert numbers to words for more natural speech
  processedText = processedText.replace(/\b(\d+)\b/g, (match, number) => {
    // Only convert small numbers, leave larger ones as digits
    if (parseInt(number) < 100) {
      return convertNumberToWords(parseInt(number));
    }
    return match;
  });
  
  // Add natural pauses and inflection for better prosody
  processedText = processedText
    .replace(/\./g, '. ')
    .replace(/\,/g, ', ')
    .replace(/\!/g, '! ')
    .replace(/\?/g, '? ')
    // Add breathing pauses for more natural sound
    .replace(/([.!?])\s+/g, '$1 <break time="600ms"/> ')
    .replace(/(,|;)\s+/g, '$1 <break time="400ms"/> ')
    // Add emphasis on certain words for more expressive speech
    .replace(/\b(fantastic|amazing|incredible|excellent|awesome)\b/gi, '<emphasis>$1</emphasis>')
    // Remove the SSML-like tags before actual synthesis since browser speech API doesn't support them
    .replace(/<break time="(\d+)ms"\/>/g, '')
    .replace(/<emphasis>(.*?)<\/emphasis>/g, '$1');
    
  return processedText;
};

// Convert numbers to words for more natural pronunciation
function convertNumberToWords(num: number): string {
  const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
                'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
                'seventeen', 'eighteen', 'nineteen'];
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  
  if (num < 20) return ones[num];
  
  const digit = num % 10;
  if (num < 100) return tens[Math.floor(num / 10)] + (digit ? '-' + ones[digit] : '');
  
  return num.toString();
}

// Configure utterance for more natural sounding speech
export const configureUtteranceForNaturalSpeech = (
  utterance: SpeechSynthesisUtterance, 
  text: string
): void => {
  // Optimize for more natural sounding speech
  utterance.rate = 0.92; // Slightly slower for more natural cadence
  utterance.pitch = 1.05; // Slightly higher pitch for more energetic sound
  utterance.volume = 1.0;
  
  // Add more expression with pitch and rate variations for different sentence types
  if (text.includes('?')) {
    utterance.pitch = 1.15; // Higher pitch for questions
    utterance.rate = 0.85; // Slightly slower for questions
  } else if (text.includes('!')) {
    utterance.pitch = 1.25; // Higher pitch for exclamations
    utterance.rate = 0.88; // Slightly slower for emphasis
  }
  
  // For longer texts, use a slightly faster rate to maintain engagement
  if (text.length > 200) {
    utterance.rate = Math.min(utterance.rate + 0.05, 1.0);
  }
};

// Speech Recognition helpers
export const initializeSpeechRecognition = (): SpeechRecognition | null => {
  // Check if browser supports speech recognition
  if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    try {
      console.log('Initializing speech recognition...');
      const recognition = new SpeechRecognition();
      
      // Configure recognition settings
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US'; // Ensure English recognition for accuracy
      
      // Give some extra time for processing
      recognition.maxAlternatives = 1;
      
      return recognition;
    } catch (error) {
      console.error('Error initializing speech recognition:', error);
      return null;
    }
  }
  
  console.error('Speech recognition not supported');
  return null;
};

export const initializeSpeechSynthesis = (): SpeechSynthesis | null => {
  if ('speechSynthesis' in window) {
    // Force initialize voices if available
    const synth = window.speechSynthesis;
    synth.getVoices(); // Trigger voice loading
    
    // For iOS Safari, we need to speak a silent utterance to initialize the voices
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
      const silentUtterance = new SpeechSynthesisUtterance('');
      silentUtterance.volume = 0;
      synth.speak(silentUtterance);
    }
    
    return synth;
  }
  
  console.error('Speech synthesis not supported');
  return null;
};

export const handleSpeechRecognitionError = (error: string): void => {
  console.error('Speech recognition error', error);
  
  // Don't show aborted errors to user as they happen when we stop listening intentionally
  if (error !== 'aborted') {
    let errorMessage = 'Microphone error';
    
    // Provide more specific error messages
    if (error === 'not-allowed') {
      errorMessage = 'Microphone access denied. Please enable microphone permissions.';
    } else if (error === 'network') {
      errorMessage = 'Network error occurred during voice recognition.';
    } else if (error === 'no-speech') {
      errorMessage = 'No speech detected. Please try again.';
    } else if (error === 'service-not-allowed') {
      errorMessage = 'Speech recognition service not allowed. Please check browser settings.';
    } else if (error === 'audio-capture') {
      errorMessage = 'Could not capture audio. Please check your microphone.';
    } else {
      errorMessage = `Microphone error: ${error}`;
    }
    
    toast.error(errorMessage);
  }
};
