
import { CheckCircle } from "lucide-react";

interface VerifiedIconProps {
  className?: string;
}

const VerifiedIcon = ({ className }: VerifiedIconProps) => {
  return <CheckCircle className={className} />;
};

export default VerifiedIcon;
