
import { useState, useRef, useCallback, useEffect } from 'react';

interface UseVoiceActivityDetectionProps {
  threshold?: number;
  silenceTimeout?: number;
  onVoiceStart?: () => void;
  onVoiceEnd?: () => void;
  onSilenceDetected?: () => void;
}

export const useVoiceActivityDetection = ({
  threshold = 0.01,
  silenceTimeout = 2000,
  onVoiceStart,
  onVoiceEnd,
  onSilenceDetected
}: UseVoiceActivityDetectionProps = {}) => {
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [isMonitoring, setIsMonitoring] = useState(false);
  
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  
  const startMonitoring = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      
      mediaStreamRef.current = stream;
      
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;
      
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;
      analyserRef.current = analyser;
      
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      
      const detectVoiceActivity = () => {
        if (!analyserRef.current) return;
        
        analyserRef.current.getByteFrequencyData(dataArray);
        
        // Calculate RMS (Root Mean Square) for better voice detection
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i] * dataArray[i];
        }
        const rms = Math.sqrt(sum / dataArray.length) / 255;
        
        setAudioLevel(rms);
        
        const wasVoiceActive = isVoiceActive;
        const isCurrentlyActive = rms > threshold;
        
        if (isCurrentlyActive && !wasVoiceActive) {
          setIsVoiceActive(true);
          if (onVoiceStart) onVoiceStart();
          
          // Clear any existing silence timer
          if (silenceTimerRef.current) {
            clearTimeout(silenceTimerRef.current);
            silenceTimerRef.current = null;
          }
        } else if (!isCurrentlyActive && wasVoiceActive) {
          // Start silence timer
          silenceTimerRef.current = setTimeout(() => {
            setIsVoiceActive(false);
            if (onVoiceEnd) onVoiceEnd();
            if (onSilenceDetected) onSilenceDetected();
          }, silenceTimeout);
        }
        
        animationFrameRef.current = requestAnimationFrame(detectVoiceActivity);
      };
      
      detectVoiceActivity();
      setIsMonitoring(true);
      
    } catch (error) {
      console.error('Error starting voice activity detection:', error);
    }
  }, [threshold, silenceTimeout, onVoiceStart, onVoiceEnd, onSilenceDetected, isVoiceActive]);
  
  const stopMonitoring = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
    
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    analyserRef.current = null;
    setIsMonitoring(false);
    setIsVoiceActive(false);
    setAudioLevel(0);
  }, []);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopMonitoring();
    };
  }, [stopMonitoring]);
  
  return {
    isVoiceActive,
    audioLevel,
    isMonitoring,
    startMonitoring,
    stopMonitoring
  };
};
