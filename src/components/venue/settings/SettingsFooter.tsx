
import React from 'react';
import { Button } from "@/components/ui/button";

interface SettingsFooterProps {
  saveStatus: string | null;
  onSave: () => void;
  onClear: () => void;
}

const SettingsFooter: React.FC<SettingsFooterProps> = ({
  saveStatus,
  onSave,
  onClear
}) => {
  return (
    <>
      {saveStatus && (
        <div className="bg-green-500/10 text-green-600 p-2 rounded text-sm text-center">
          {saveStatus}
        </div>
      )}
      
      <div className="flex justify-between pt-4">
        <Button variant="outline" size="sm" onClick={onClear}>
          Clear All
        </Button>
        <Button onClick={onSave}>
          Save Settings
        </Button>
      </div>
    </>
  );
};

export default SettingsFooter;
