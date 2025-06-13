
import React from 'react';
import { Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SmartChatButtonProps {
  onClick: () => void;
}

const SmartChatButton: React.FC<SmartChatButtonProps> = ({ onClick }) => {
  const isMobile = useIsMobile();
  const scrollDirection = useScrollDirection();
  const location = useLocation();
  
  // Determine if we're on a page with bottom navigation
  const hasBottomNav = isMobile && ['/', '/explore', '/my-places', '/profile'].includes(location.pathname);
  
  // Calculate dynamic positioning to avoid home button
  const getPosition = () => {
    if (!isMobile) return 'left-6 bottom-6';
    
    if (hasBottomNav) {
      // Move higher when bottom nav is present
      return scrollDirection === 'down' ? 'left-6 bottom-20' : 'left-6 bottom-24';
    }
    
    return 'left-6 bottom-6';
  };
  
  // Show/hide based on scroll direction for mobile
  const isVisible = !isMobile || scrollDirection !== 'down' || hasBottomNav;

  return (
    <Button
      onClick={onClick}
      className={cn(
        "fixed w-16 h-16 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center p-0 hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 z-60",
        getPosition(),
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
      )}
      aria-label="Open Vernon Chat"
    >
      <div className="absolute inset-0 rounded-full bg-blue-500 opacity-0 group-hover:opacity-20 transition-opacity" />
      <Bot className="h-7 w-7" />
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
    </Button>
  );
};

export default SmartChatButton;
