// FILE: src/pages/Index.tsx (Updated)
import { useState } from "react";
import { Header, TradeMode } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MarketsSidebar } from "@/components/trading/MarketsSidebar";
import { TradingChart } from "@/components/trading/TradingChart";
import { OrderPanel } from "@/components/trading/OrderPanel";
import { PositionsTable } from "@/components/trading/PositionsTable";
import { useTradingData } from "@/components/ui/use-toast"; // <-- NEW IMPORT

const Index = () => {
  // State is now managed in useTradingData hook
  const { tradeMode, setTradeMode, selectedMarket, setSelectedMarket } = useTradingData(); 

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header /> {/* Removed props */}
      
      <div className="flex h-[calc(100vh-3.5rem-5rem)]">
        <MarketsSidebar /> {/* Removed props */}
        
        <div className="flex-1 flex flex-col">
          <div className="flex-1 flex gap-4 p-4">
            <TradingChart market={selectedMarket} />
            <OrderPanel /> {/* Removed props */}
          </div>
          
          <div className="h-64 px-4 pb-4">
            <PositionsTable />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
