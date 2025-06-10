
import React from "react";

interface ExploreHeaderProps {
  title: string;
}

const ExploreHeader = ({ title }: ExploreHeaderProps) => {
  return (
    <h1 className="text-3xl font-bold text-center mb-6 vibe-gradient-text">
      {title}
    </h1>
  );
};

export default ExploreHeader;
