
import React from 'react';
import RegularUserPayments from './RegularUserPayments';
import VenuePayments from './VenuePayments';

interface PaymentsTabContentProps {
  isVenueMode?: boolean;
}

const PaymentsTabContent: React.FC<PaymentsTabContentProps> = ({ isVenueMode = false }) => {
  return (
    <div className="space-y-6">
      {isVenueMode ? (
        <VenuePayments />
      ) : (
        <RegularUserPayments />
      )}
    </div>
  );
};

export default PaymentsTabContent;
