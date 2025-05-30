
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface VerifiedIconProps {
  className?: string;
}

const VerifiedIcon = ({ className }: VerifiedIconProps) => {
  return (
    <div className="relative inline-block">
      <CheckCircle className={cn("transition-all duration-300", className)} />
      <span className="absolute inset-0 rounded-full bg-primary opacity-20 animate-ping" />
    </div>
  );
};

export default VerifiedIcon;
