
import { UseListeningControlsProps } from './types';

export const useListeningControls = ({
  speechRecognition,
  initialized,
  isListening,
  setIsListening,
  setIsProcessing,
  setTranscript,
  setInterimTranscript,
  clearSilenceTimer,
  useLocalWhisper,
  mediaRecorder,
  audioChunks,
  processAudioWithOpenRouter
}: UseListeningControlsProps) => {
  
  const startListening = () => {
    if (!initialized || isListening) return;
    
    clearSilenceTimer();
    setTranscript('');
    setInterimTranscript('');
    
    if (useLocalWhisper && mediaRecorder) {
      console.log('Starting MediaRecorder for local whisper');
      try {
        audioChunks.length = 0; // Clear previous chunks
        mediaRecorder.start();
      } catch (error) {
        console.error('Error starting media recorder:', error);
      }
    } else if (speechRecognition) {
      try {
        console.log('Starting speech recognition');
        speechRecognition.start();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
      }
    }
    
    setIsListening(true);
  };
  
  const stopListening = () => {
    if (!isListening) return;
    
    clearSilenceTimer();
    
    if (useLocalWhisper && mediaRecorder) {
      console.log('Stopping MediaRecorder for local whisper');
      try {
        mediaRecorder.stop();
        
        // Process audio with OpenRouter when recording stops
        mediaRecorder.addEventListener('dataavailable', async (e) => {
          audioChunks.push(e.data);
        });
        
        mediaRecorder.addEventListener('stop', async () => {
          if (audioChunks.length > 0) {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            setIsProcessing(true);
            
            try {
              let finalTranscript = '';
              
              // Try OpenRouter first if available
              if (processAudioWithOpenRouter) {
                try {
                  finalTranscript = await processAudioWithOpenRouter(audioBlob);
                  console.log('OpenRouter transcript:', finalTranscript);
                } catch (error) {
                  console.error('Error with OpenRouter transcription, falling back:', error);
                }
              }
              
              // If OpenRouter failed or wasn't used, fall back to local Whisper
              if (!finalTranscript) {
                // Add local Whisper processing here if needed
                console.log('No OpenRouter transcript, would use local Whisper here');
              }
              
              if (finalTranscript) {
                setTranscript(finalTranscript);
              } else {
                setTranscript('');
              }
            } catch (error) {
              console.error('Error processing audio:', error);
              setTranscript('');
            } finally {
              setIsProcessing(false);
              setIsListening(false);
            }
          }
        });
      } catch (error) {
        console.error('Error stopping media recorder:', error);
        setIsProcessing(false);
        setIsListening(false);
      }
    } else if (speechRecognition) {
      try {
        console.log('Stopping speech recognition');
        speechRecognition.stop();
      } catch (error) {
        console.error('Error stopping speech recognition:', error);
        setIsListening(false);
      }
    } else {
      setIsListening(false);
    }
  };
  
  return {
    startListening,
    stopListening
  };
};
