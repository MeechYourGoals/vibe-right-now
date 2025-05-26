
import MarketingSuite from "./MarketingSuite";

interface AdvertisingTabProps {
  isPremium: boolean;
}

const AdvertisingTab = ({ isPremium }: AdvertisingTabProps) => {
  if (!isPremium) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Advertising features require a Premium or Pro subscription.</p>
      </div>
    );
  }
  
  return <MarketingSuite />;
};

export default AdvertisingTab;
