
import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({ 
  children, 
  className,
  ...props
}) => {
  return (
    <div 
      className={cn("container mx-auto px-4", className)}
      {...props}
    >
      {children}
    </div>
  );
};
