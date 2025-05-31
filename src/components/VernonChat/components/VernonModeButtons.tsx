
import React from 'react';
import { Button } from '@/components/ui/button';
import { Building2, Bot, Crown, User } from 'lucide-react';

interface VernonModeButtonsProps {
  isProPlan?: boolean;
  handleOpenChat: (mode: boolean) => void;
}

const VernonModeButtons: React.FC<VernonModeButtonsProps> = ({
  isProPlan = false,
  handleOpenChat
}) => {
  if (!isProPlan) return null;
  
  return (
    <div className="flex flex-col gap-2 mb-4">
      <Button 
        variant="outline" 
        size="icon" 
        className="rounded-full h-12 w-12 border-amber-400 bg-amber-100 hover:bg-amber-200"
        onClick={() => handleOpenChat(true)}
        title="Open Venue Mode"
      >
        <Building2 className="h-5 w-5 text-amber-700" />
      </Button>
      
      <Button 
        variant="outline" 
        size="icon" 
        className="rounded-full h-12 w-12 border-primary-400 bg-primary-100 hover:bg-primary-200"
        onClick={() => handleOpenChat(false)}
        title="Open User Mode"
      >
        <User className="h-5 w-5 text-primary-700" />
      </Button>
    </div>
  );
};

export default VernonModeButtons;
