
import React from 'react';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SmartCameraButtonProps {
  onClick: () => void;
}

const SmartCameraButton: React.FC<SmartCameraButtonProps> = ({ onClick }) => {
  const isMobile = useIsMobile();
  const scrollDirection = useScrollDirection();
  const location = useLocation();
  
  // Determine if we're on a page with bottom navigation
  const hasBottomNav = isMobile && ['/', '/explore', '/my-places', '/profile'].includes(location.pathname);
  
  // Calculate dynamic positioning
  const getBottomPosition = () => {
    if (!hasBottomNav) return 'bottom-6';
    
    // Higher position when bottom nav is present
    if (scrollDirection === 'down') {
      return 'bottom-20'; // Above bottom nav when scrolling down
    }
    return 'bottom-24'; // Even higher when scrolling up or idle
  };
  
  // Show/hide based on scroll direction for mobile
  const isVisible = !isMobile || scrollDirection !== 'down' || hasBottomNav;

  return (
    <Button 
      onClick={onClick}
      className={cn(
        "fixed right-6 w-16 h-16 rounded-full shadow-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center p-0 animate-pulse-gradient transition-all duration-300 z-60",
        getBottomPosition(),
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
      )}
    >
      <Camera className="h-7 w-7" />
    </Button>
  );
};

export default SmartCameraButton;
