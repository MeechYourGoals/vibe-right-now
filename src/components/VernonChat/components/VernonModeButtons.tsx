
import React from 'react';
import { Button } from '@/components/ui/button';
import { Building2 } from 'lucide-react';

interface VernonModeButtonsProps {
  isProPlan: boolean;
  handleOpenChat: (mode: boolean) => void;
}

const VernonModeButtons: React.FC<VernonModeButtonsProps> = ({ 
  isProPlan, 
  handleOpenChat 
}) => {
  if (!isProPlan) return null;
  
  return (
    <Button
      variant="outline"
      className="h-12 w-12 rounded-full bg-amber-100 hover:bg-amber-200 border-amber-300"
      onClick={() => handleOpenChat(true)}
      title="Vernon for Venues"
    >
      <Building2 className="h-6 w-6 text-amber-800" />
    </Button>
  );
};

export default VernonModeButtons;
