
import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";

interface TripCommentInputProps {
  avatarUrl: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const TripCommentInput: React.FC<TripCommentInputProps> = ({ 
  avatarUrl, 
  value, 
  onChange, 
  onSubmit,
  isSubmitting
}) => {
  return (
    <div className="flex gap-2">
      <Avatar className="h-8 w-8">
        <AvatarImage 
          src={avatarUrl} 
          alt="Your avatar" 
        />
        <AvatarFallback>Y</AvatarFallback>
      </Avatar>
      <div className="flex-1 flex items-end gap-2">
        <Textarea
          placeholder="Post a message to the trip wall..."
          className="min-h-[60px] flex-1"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <Button 
          size="icon"
          disabled={!value.trim() || isSubmitting}
          onClick={onSubmit}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
