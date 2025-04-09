
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
