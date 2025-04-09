
// Speech synthesis helpers
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
