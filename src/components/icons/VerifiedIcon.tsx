
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface VerifiedIconProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const VerifiedIcon = ({ className, size = "md" }: VerifiedIconProps) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5", 
    lg: "h-6 w-6"
  };

  return (
    <div className="relative inline-block">
      <CheckCircle className={cn("text-blue-500 transition-all duration-300", sizeClasses[size], className)} />
      <span className="absolute inset-0 rounded-full bg-blue-500 opacity-20 animate-ping" />
    </div>
  );
};

export { VerifiedIcon };
export default VerifiedIcon;
