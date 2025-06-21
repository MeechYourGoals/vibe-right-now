
import React from 'react';
import { Button } from '@/components/ui/button';
import { Moon } from 'lucide-react';

interface VernonThemeToggleProps {
  theme: string;
  toggleTheme: () => void;
}

const VernonThemeToggle: React.FC<VernonThemeToggleProps> = ({ theme, toggleTheme }) => {
  return (
    <Button 
      variant="outline" 
      size="icon" 
      className="rounded-full h-12 w-12 mt-2 opacity-50 cursor-not-allowed"
      disabled
      title="Dark Mode Active"
    >
      <Moon className="h-5 w-5" />
    </Button>
  );
};

export default VernonThemeToggle;
