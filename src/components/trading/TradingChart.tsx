// FILE: src/components/trading/TradingChart.tsx (Updated)
import { TrendingUp, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useTradingData } from "@/components/ui/use-toast"; // <-- NEW IMPORT

interface TradingChartProps {
  // market: string; // REMOVED - Market is now in hook state
}

export const TradingChart = ({}: TradingChartProps) => { // REMOVED props
  const { selectedMarket, currentPrice, leverage } = useTradingData(); // <-- USE HOOK

  // Simulated funding rate data
  const fundingRate = 0.0123;
  const nextFundingIn = "6h 23m";
  // const markPrice = 43250.50; // REMOVED - From mock
  const indexPrice = 43248.20;
  
  // Use logic from OrderPanel to calculate a consistent Liq Price proxy
  const MAINTENANCE_RATE = 0.005; 
  const estimatedLiqPrice = currentPrice * (1 - MAINTENANCE_RATE / leverage[0]);


  return (
    <Card className="flex-1 border-border bg-card p-0 overflow-hidden">
      {/* Chart header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30">
        <div className="flex items-center gap-6">
          <div>
            <div className="text-xs text-muted-foreground">Mark Price</div>
            <div className="text-sm font-mono font-semibold">${currentPrice.toLocaleString()}</div> {/* <-- USE MARKET DATA */}
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Index Price</div>
            <div className="text-sm font-mono">${indexPrice.toLocaleString()}</div>
          </div>
          <div className="flex items-center gap-2">
            <div>
              <div className="text-xs text-muted-foreground">Funding Rate</div>
              <div className={`text-sm font-mono font-semibold ${fundingRate > 0 ? "text-long" : "text-short"}`}>
                {fundingRate > 0 ? "+" : ""}{(fundingRate * 100).toFixed(4)}%
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{nextFundingIn}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-2 py-1 text-xs rounded hover:bg-muted">1m</button>
          <button className="px-2 py-1 text-xs rounded hover:bg-muted">5m</button>
          <button className="px-2 py-1 text-xs rounded bg-secondary">15m</button>
          <button className="px-2 py-1 text-xs rounded hover:bg-muted">1h</button>
          <button className="px-2 py-1 text-xs rounded hover:bg-muted">4h</button>
          <button className="px-2 py-1 text-xs rounded hover:bg-muted">1D</button>
        </div>
      </div>

      {/* Chart area - Simulated TradingView style */}
      <div className="relative h-[600px] bg-gradient-to-b from-background to-muted/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4 opacity-40">
            <TrendingUp className="h-16 w-16 mx-auto text-primary" />
            <div className="text-sm text-muted-foreground">
              <div className="font-semibold mb-1">Professional Trading Chart</div>
              <div>Real-time price action for {selectedMarket}</div> {/* <-- USE MARKET DATA */}
            </div>
          </div>
        </div>
        
        {/* Simulated chart grid */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute left-0 right-0 border-t border-chart-grid"
              style={{ top: `${(i + 1) * 12.5}%` }}
            />
          ))}
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 border-l border-chart-grid"
              style={{ left: `${(i + 1) * 10}%` }}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};
