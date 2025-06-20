
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, Users, MessageSquare } from "lucide-react";

interface QuickActionsProps {
  onTierChange: (tier: string) => void;
  currentTier: 'standard' | 'plus' | 'premium' | 'pro';
}

const QuickActions = ({ onTierChange, currentTier }: QuickActionsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Button size="default" className="flex items-center justify-center gap-2 h-12 text-sm">
            <Plus className="h-4 w-4" />
            New Post
          </Button>
          
          <Button size="default" className="flex items-center justify-center gap-2 h-12 text-sm">
            <Calendar className="h-4 w-4" />
            Add Event
          </Button>
          
          <Button size="default" className="flex items-center justify-center gap-2 h-12 text-sm">
            <Users className="h-4 w-4" />
            Promotions
          </Button>
          
          <Button size="default" className="flex items-center justify-center gap-2 h-12 text-sm">
            <MessageSquare className="h-4 w-4" />
            Send Message
          </Button>
        </div>
        
        {currentTier === 'standard' && (
          <Button 
            className="w-full bg-gradient-to-r from-plus-primary to-plus-secondary hover:from-purple-600 hover:to-teal-600 text-white"
            onClick={() => onTierChange('plus')}
          >
            Upgrade to Plus
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default QuickActions;
