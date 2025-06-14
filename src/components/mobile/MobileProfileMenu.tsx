
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { 
  User, 
  MapPin, 
  Heart, 
  Star, 
  Settings, 
  BarChart3, 
  Megaphone,
  MessageSquare
} from 'lucide-react';

interface MobileProfileMenuProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

const MobileProfileMenu: React.FC<MobileProfileMenuProps> = ({ 
  isOpen, 
  onOpenChange, 
  children 
}) => {
  const menuItems = [
    { icon: User, label: 'My Profile', href: '/profile' },
    { icon: MapPin, label: 'My Places', href: '/my-places' },
    { icon: MessageSquare, label: 'Messages', href: '/messages' },
    { icon: Heart, label: 'Pinned Vibes', href: '/pinned-vibes' },
    { icon: Star, label: 'Points', href: '/user-points' },
    { icon: Settings, label: 'Settings', href: '/settings' },
    { icon: BarChart3, label: 'Data Insights', href: '/data-insights' },
    { icon: Megaphone, label: 'Advertiser Hub', href: '/advertiser-hub' },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[60vh] rounded-t-2xl">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-xl font-bold vibe-gradient-text">
            My VRN
          </SheetTitle>
        </SheetHeader>
        
        <div className="grid grid-cols-2 gap-4">
          {menuItems.map((item) => (
            <Link 
              key={item.href} 
              to={item.href}
              onClick={() => onOpenChange(false)}
              className="block"
            >
              <Button 
                variant="outline" 
                className="w-full h-20 flex flex-col items-center justify-center gap-2 hover:bg-primary/10"
              >
                <item.icon className="h-6 w-6" />
                <span className="text-sm text-center">{item.label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileProfileMenu;
