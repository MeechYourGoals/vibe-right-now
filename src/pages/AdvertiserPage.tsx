// src/pages/AdvertiserPage.tsx
import React from 'react';

import AdvertiserTab from '@/components/advertiser/AdvertiserTab'; // Assuming this path

const AdvertiserPage: React.FC = () => {
  return (
    <div>
      <h1>Advertiser Hub</h1>
      <AdvertiserTab />
    </div>
  );
};

export default AdvertiserPage;
