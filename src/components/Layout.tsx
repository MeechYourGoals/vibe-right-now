
import Header from "./Header";
import BottomNavbar from "./BottomNavbar";
import { useIsMobile } from "@/hooks/use-mobile";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={`flex-1 pt-4 ${isMobile ? 'pb-20' : ''}`}>
        {children}
      </main>
      <BottomNavbar />
    </div>
  );
};
