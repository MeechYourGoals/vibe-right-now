
import React from 'react';
import ExternalReviewAnalysis from './ExternalReviewAnalysis';
import AudioOverviewCard from './AudioOverviewCard';

interface PremiumFeaturesContainerProps {
  venueId: string;
  venueName: string;
}

const PremiumFeaturesContainer: React.FC<PremiumFeaturesContainerProps> = ({
  venueId,
  venueName
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <ExternalReviewAnalysis 
        venueId={venueId}
        venueName={venueName}
      />
      <AudioOverviewCard
        venueId={venueId}
        venueName={venueName}
      />
    </div>
  );
};

export default PremiumFeaturesContainer;
