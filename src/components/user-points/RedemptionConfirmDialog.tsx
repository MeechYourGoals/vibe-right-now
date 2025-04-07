
import { Button } from "@/components/ui/button";
import { Reward } from "./types";

interface RedemptionConfirmDialogProps {
  reward: Reward;
  onCancel: () => void;
  onConfirm: () => void;
}

const RedemptionConfirmDialog = ({ 
  reward, 
  onCancel, 
  onConfirm 
}: RedemptionConfirmDialogProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="bg-card p-6 rounded-lg max-w-sm w-full">
        <h3 className="text-lg font-bold mb-4">Confirm Redemption</h3>
        <p>
          You are about to redeem <span className="font-semibold">{reward.description}</span> at{" "}
          <span className="font-semibold">{reward.venueName}</span> for{" "}
          <span className="font-semibold">{reward.points} points</span>.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          This action cannot be undone. Your points will be deducted immediately.
        </p>
        <div className="flex gap-3 mt-6">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button 
            className="flex-1 bg-gradient-vibe"
            onClick={onConfirm}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RedemptionConfirmDialog;
