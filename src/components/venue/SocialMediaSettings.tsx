
import React, { useState, useEffect } from 'react';
import { SocialMediaApiKeys } from '@/services/SocialMediaService';
import ApiKeyTabSwitcher from './settings/ApiKeyTabSwitcher';
import ContentPlatformSettings from './settings/ContentPlatformSettings';
import ReviewPlatformSettings from './settings/ReviewPlatformSettings';
import SettingsFooter from './settings/SettingsFooter';

interface SocialMediaSettingsProps {
  onSaveApiKeys: (keys: SocialMediaApiKeys) => void;
  initialApiKeys?: SocialMediaApiKeys;
}

const SocialMediaSettings: React.FC<SocialMediaSettingsProps> = ({ 
  onSaveApiKeys,
  initialApiKeys 
}) => {
  const [apiKeys, setApiKeys] = useState<SocialMediaApiKeys>({
    instagram: '',
    tiktok: '',
    yelp: '',
    google: '',
    franki: ''
  });
  
  const [activeTab, setActiveTab] = useState('content');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [otherPlatformName, setOtherPlatformName] = useState('');

  // Load saved keys on component mount
  useEffect(() => {
    if (initialApiKeys) {
      setApiKeys(initialApiKeys);
    } else {
      const savedKeys = localStorage.getItem('socialMediaApiKeys');
      if (savedKeys) {
        try {
          const parsedKeys = JSON.parse(savedKeys);
          setApiKeys(parsedKeys);
          
          // Also load custom platform name if it exists
          const savedPlatformName = localStorage.getItem('otherPlatformName');
          if (savedPlatformName) {
            setOtherPlatformName(savedPlatformName);
          }
        } catch (error) {
          console.error('Error parsing saved API keys:', error);
        }
      }
    }
  }, [initialApiKeys]);

  const handleInputChange = (platform: keyof SocialMediaApiKeys, value: string) => {
    setApiKeys(prev => ({
      ...prev,
      [platform]: value
    }));
  };

  const handleSave = () => {
    // Save to localStorage for persistence
    localStorage.setItem('socialMediaApiKeys', JSON.stringify(apiKeys));
    
    // Save custom platform name if provided
    if (otherPlatformName) {
      localStorage.setItem('otherPlatformName', otherPlatformName);
    }
    
    // Call the provided callback with the updated keys
    onSaveApiKeys(apiKeys);
    
    // Show success message
    setSaveStatus('Settings saved successfully');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const clearAll = () => {
    const emptyKeys: SocialMediaApiKeys = {
      instagram: '',
      tiktok: '',
      yelp: '',
      google: '',
      franki: ''
    };
    
    setApiKeys(emptyKeys);
    setOtherPlatformName('');
    localStorage.removeItem('socialMediaApiKeys');
    localStorage.removeItem('otherPlatformName');
    onSaveApiKeys(emptyKeys);
    
    setSaveStatus('All connections cleared');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  return (
    <div className="space-y-4 bg-neutral-900 p-6 rounded-lg">
      <ApiKeyTabSwitcher
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      {activeTab === 'content' ? (
        <ContentPlatformSettings
          apiKeys={apiKeys}
          onInputChange={handleInputChange}
        />
      ) : (
        <ReviewPlatformSettings
          apiKeys={apiKeys}
          onInputChange={handleInputChange}
          otherPlatformName={otherPlatformName}
          setOtherPlatformName={setOtherPlatformName}
        />
      )}
      
      <SettingsFooter
        saveStatus={saveStatus}
        onSave={handleSave}
        onClear={clearAll}
      />
    </div>
  );
};

export default SocialMediaSettings;
