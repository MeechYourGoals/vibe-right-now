
import { useEffect, useState } from 'react';
import { LocalAIService } from '@/services/LocalAIService';
import { toast } from 'sonner';

export const AIModelInitializer = () => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initAI = async () => {
      try {
        await LocalAIService.initModels();
        console.log('AI models initialized successfully');
        setInitialized(true);
      } catch (error) {
        console.error('Failed to initialize AI models:', error);
        toast.error('AI personalization could not be loaded', {
          description: 'Using standard search instead'
        });
      }
    };

    // Initialize AI models in background
    initAI();
  }, []);

  // This is a hidden component, it doesn't render anything visible
  return null;
};

export default AIModelInitializer;
