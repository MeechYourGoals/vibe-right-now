
import React from 'react';
import { Layout } from "@/components/Layout";
import VenueMessaging from '@/components/messaging/VenueMessaging';

const Messages: React.FC = () => {
  return (
    <Layout>
      <div className="container py-6">
        <VenueMessaging />
      </div>
    </Layout>
  );
};

export default Messages;
