
import React, { useState } from 'react';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface InviteUserDialogProps {
  tripName: string;
  onClose: () => void;
  onInvite: (email: string) => void;
}

export const InviteUserDialog: React.FC<InviteUserDialogProps> = ({ 
  tripName, 
  onClose,
  onInvite
}) => {
  const [inviteEmail, setInviteEmail] = useState("");

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Invite to Trip</DialogTitle>
        <DialogDescription>
          Invite friends to collaborate on {tripName}
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email Address
          </label>
          <Input 
            id="email" 
            type="email" 
            placeholder="friend@example.com" 
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            They'll receive an invite to join this trip and Vibe Right Now
          </p>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button 
          onClick={() => {
            if (inviteEmail) {
              onInvite(inviteEmail);
            }
          }}
          disabled={!inviteEmail}
        >
          Send Invite
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
