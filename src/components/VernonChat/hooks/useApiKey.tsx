import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export const useApiKey = () => {
  const [apiKey, setApiKey] = useState<string | null>(localStorage.getItem('perplexityApiKey'));
  const [isApiKeyPopoverOpen, setIsApiKeyPopoverOpen] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  
  useEffect(() => {
    // Check for API key on component mount
    const storedApiKey = localStorage.getItem('perplexityApiKey');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);
  
  const saveApiKey = () => {
    if (apiKeyInput.trim()) {
      localStorage.setItem('perplexityApiKey', apiKeyInput);
      setApiKey(apiKeyInput);
      setApiKeyInput('');
      setIsApiKeyPopoverOpen(false);
      toast.success('API key saved successfully');
    } else {
      toast.error('Please enter a valid API key');
    }
  };

  return {
    apiKey,
    isApiKeyPopoverOpen,
    setIsApiKeyPopoverOpen,
    apiKeyInput,
    setApiKeyInput,
    saveApiKey
  };
};
