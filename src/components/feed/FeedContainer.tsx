
import React from "react";

interface FeedContainerProps {
  children: React.ReactNode;
}

const FeedContainer = ({ children }: FeedContainerProps) => {
  return (
    <div className="space-y-6">
      {children}
    </div>
  );
};

export default FeedContainer;
