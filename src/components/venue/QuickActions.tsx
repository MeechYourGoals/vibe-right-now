
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, Users, MessageSquare, Share2 } from "lucide-react";

interface QuickActionsProps {
  onTierChange: (tier: string) => void;
  currentTier: 'standard' | 'plus' | 'premium' | 'pro';
}

const QuickActions = ({ onTierChange, currentTier }: QuickActionsProps) => {
  return (
    <Card className="bg-neutral-900 border-neutral-700">
      <CardHeader>
        <CardTitle className="text-white">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <Button size="sm" className="flex items-center justify-start gap-2 bg-teal-600 hover:bg-teal-700 text-white">
            <Plus className="h-4 w-4" />
            New Post
          </Button>
          
          <Button size="sm" className="flex items-center justify-start gap-2 bg-teal-600 hover:bg-teal-700 text-white">
            <Calendar className="h-4 w-4" />
            Add Event
          </Button>
          
          <Button size="sm" className="flex items-center justify-start gap-2 bg-teal-600 hover:bg-teal-700 text-white">
            <Users className="h-4 w-4" />
            Promotions
          </Button>
          
          <Button size="sm" className="flex items-center justify-start gap-2 bg-teal-600 hover:bg-teal-700 text-white">
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
