
import React from 'react';
import RegularUserPayments from './RegularUserPayments';
import VenuePayments from './VenuePayments';

const PaymentsTabContent: React.FC = () => {
  const userType = 'regular'; // This would come from user context in a real app

  return (
    <div className="space-y-6">
      {userType === 'venue' ? (
        <VenuePayments />
      ) : (
        <RegularUserPayments />
      )}
    </div>
  );
};

export default PaymentsTabContent;
