
import React from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

interface VernonThemeToggleProps {
  theme: string;
  toggleTheme: () => void;
}

const VernonThemeToggle: React.FC<VernonThemeToggleProps> = ({ theme, toggleTheme }) => {
  return (
    <Button 
      variant="outline" 
      className="h-12 w-12 rounded-full" 
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleTheme();
      }}
      title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    >
      {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </Button>
  );
};

export default VernonThemeToggle;
