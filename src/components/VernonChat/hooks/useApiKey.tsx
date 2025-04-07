
import { useState, useEffect } from 'react';

export const useApiKey = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [apiKeyInput, setApiKeyInput] = useState<string>('');
  const [isApiKeyPopoverOpen, setIsApiKeyPopoverOpen] = useState(false);
  
  // Load API key from localStorage on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem('huggingfaceApiKey');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    } else {
      // Only show the API key popover if there's no saved key
      setIsApiKeyPopoverOpen(true);
    }
  }, []);
  
  // Save API key to localStorage
  const saveApiKey = () => {
    if (apiKeyInput.trim()) {
      localStorage.setItem('huggingfaceApiKey', apiKeyInput.trim());
      setApiKey(apiKeyInput.trim());
      setIsApiKeyPopoverOpen(false);
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
