
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

interface VerifiedProps {
  className?: string;
}

const Verified = ({ className }: VerifiedProps) => {
  return (
    <Badge variant="secondary" className={`inline-flex items-center ${className}`}>
      <CheckCircle className="h-3 w-3 mr-1" />
      Verified
    </Badge>
  );
};

export default Verified;
