import { useState } from "react";
import { Header, TradeMode } from "@/components/Header";
import { MarketsSidebar } from "@/components/trading/MarketsSidebar";
import { TradingChart } from "@/components/trading/TradingChart";
import { OrderPanel } from "@/components/trading/OrderPanel";
import { PositionsTable } from "@/components/trading/PositionsTable";

const Index = () => {
  const [tradeMode, setTradeMode] = useState<TradeMode>("futures");
  const [selectedMarket, setSelectedMarket] = useState("BTCUSD");

  return (
    <div className="min-h-screen bg-background">
      <Header tradeMode={tradeMode} onTradeModeChange={setTradeMode} />
      
      <div className="flex h-[calc(100vh-3.5rem)]">
        <MarketsSidebar 
          selectedMarket={selectedMarket}
          onSelectMarket={setSelectedMarket}
        />
        
        <div className="flex-1 flex flex-col">
          <div className="flex-1 flex gap-4 p-4">
            <TradingChart market={selectedMarket} />
            <OrderPanel market={selectedMarket} />
          </div>
          
          <div className="h-64 px-4 pb-4">
            <PositionsTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
