import { useState, useEffect } from 'react';

export const useApiKey = () => {
  // We don't need apiKey storage anymore, but will keep the structure
  // to avoid breaking the components that depend on it
  const [isApiKeyPopoverOpen, setIsApiKeyPopoverOpen] = useState(false);
  
  return {
    apiKey: 'no-api-key-needed', // Hardcode a dummy value
    isApiKeyPopoverOpen,
    setIsApiKeyPopoverOpen,
    apiKeyInput: '',
    setApiKeyInput: () => {}, // No-op function
    saveApiKey: () => {} // No-op function
  };
};
