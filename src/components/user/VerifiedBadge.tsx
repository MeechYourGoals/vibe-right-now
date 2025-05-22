
import { BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface VerifiedBadgeProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const VerifiedBadge = ({ className, size = "md" }: VerifiedBadgeProps) => {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  };

  return (
    <BadgeCheck 
      className={cn(
        "text-blue-500 fill-blue-500", 
        sizeClasses[size],
        className
      )}
    />
  );
};

export default VerifiedBadge;
