// --- CONCEPT: NEW FILE src/hooks/useTradingData.ts ---

import { useState, useMemo, useCallback } from "react";
import { useToast } from "sonner";
import { TrendingUp, TrendingDown, X, Edit } from "lucide-react";

// --- MOCK INTERFACES & DATA ---

export interface Position {
  id: string;
  market: string;
  side: "long" | "short";
  size: number;
  entryPrice: number;
  markPrice: number;
  liquidationPrice: number;
  pnl: number;
  pnlPercent: number;
  leverage: number;
}

export interface Market {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: string;
}

const MOCK_MARKETS: Market[] = [
  { symbol: "BTCUSD", name: "Bitcoin", price: 43250.50, change24h: 2.34, volume24h: "12.5B" },
  { symbol: "ETHUSD", name: "Ethereum", price: 2280.75, change24h: -1.23, volume24h: "8.2B" },
  { symbol: "SOLUSD", name: "Solana", price: 98.45, change24h: 5.67, volume24h: "1.8B" },
  { symbol: "BNBUSD", name: "BNB", price: 312.80, change24h: 0.89, volume24h: "980M" },
  { symbol: "ADAUSD", name: "Cardano", price: 0.5234, change24h: -2.45, volume24h: "650M" },
  { symbol: "XRPUSD", name: "Ripple", price: 0.6123, change24h: 1.78, volume24h: "1.2B" },
  { symbol: "DOTUSD", name: "Polkadot", price: 7.89, change24h: 3.21, volume24h: "420M" },
  { symbol: "DOGEUSD", name: "Dogecoin", price: 0.0823, change24h: -0.56, volume24h: "580M" },
];

const MOCK_POSITIONS: Position[] = [
  {
    id: "1",
    market: "BTCUSD",
    side: "long",
    size: 0.5,
    entryPrice: 42800,
    markPrice: 43250.50,
    liquidationPrice: 38520,
    pnl: 225.25,
    pnlPercent: 5.26,
    leverage: 10,
  },
  {
    id: "2",
    market: "ETHUSD",
    side: "short",
    size: 5.0,
    entryPrice: 2300,
    markPrice: 2280.75,
    liquidationPrice: 2530,
    pnl: 96.25,
    pnlPercent: 4.19,
    leverage: 5,
  },
];

// --- MOCK HOOK ---

export function useTradingData() {
  const { toast } = useToast();
  const [positions, setPositions] = useState<Position[]>(MOCK_POSITIONS);
  const [selectedMarket, setSelectedMarket] = useState<string>("BTCUSD");
  const [tradeMode, setTradeMode] = useState<"futures" | "spot" | "options">("futures");

  // --- Markets Logic (to replace MarketsSidebar internal state) ---
  const [sortBy, setSortBy] = useState<"volume" | "change" | "price">("volume");
  const [searchTerm, setSearchTerm] = useState("");

  const sortedAndFilteredMarkets = useMemo(() => {
    return MOCK_MARKETS
      .filter(m => 
        m.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === "volume") return parseFloat(b.volume24h) - parseFloat(a.volume24h);
        if (sortBy === "change") return b.change24h - a.change24h;
        return b.price - a.price;
      });
  }, [searchTerm, sortBy]);

  // --- Order Panel Logic (to replace OrderPanel internal state) ---
  const [leverage, setLeverage] = useState([10]);
  
  const currentMarketData = MOCK_MARKETS.find(m => m.symbol === selectedMarket) || MOCK_MARKETS[0];
  const currentPrice = currentMarketData.price;
  
  // --- Improved Liquidation Price Calculation ---
  const estimatedLiqPrice = useCallback((
    currentP: number, 
    lev: number, 
    side: "long" | "short"
  ) => {
    // Simple model: Maintenance margin is often ~0.5% (50% of initial 1% of initial margin)
    // For Perpetuals, Liquidation Price is often close to Entry Price * (1 - Maintenance Margin Rate / Leverage)
    // Assuming a simplified maintenance margin rate of 0.5% (0.005)
    const MAINTENANCE_RATE = 0.005; 
    if (side === "long") {
      return currentP * (1 - MAINTENANCE_RATE / lev);
    } else { // short
      return currentP * (1 + MAINTENANCE_RATE / lev);
    }
  }, []);

  const currentLiqPrice = useMemo(() => {
    // Placeholder: uses the first mock position's leverage for now, should be an input
    const lev = leverage[0]; 
    return estimatedLiqPrice(currentPrice, lev, "long"); 
  }, [currentPrice, leverage, estimatedLiqPrice]);

  // --- Actions ---
  const handlePlaceOrder = (side: "long" | "short", size: string, collateral: string) => {
    const lev = leverage[0];
    toast.success(`${side === "long" ? "Long" : "Short"} order placed for ${selectedMarket}`, {
      description: `Size: ${size} | Leverage: ${lev}x | Collateral: ${collateral}`,
    });
  };
  
  const handleClosePosition = useCallback((id: string, symbol: string) => {
    setPositions(prev => prev.filter(p => p.id !== id));
    toast.success(`Closed position ${id} for ${symbol}`);
  }, []);

  // In a real app, positions would update in real-time. Here we just provide the mock data.
  const getPositionActions = (id: string, symbol: string) => ({
    edit: () => toast.info(`Edit position ${id}`),
    close: () => handleClosePosition(id, symbol),
  });


  return {
    // State/Data for Trading
    markets: sortedAndFilteredMarkets,
    selectedMarket,
    setSelectedMarket,
    sortBy,
    setSortBy,
    searchTerm,
    setSearchTerm,
    
    // State/Data for Order Panel
    orderType: "limit" as "market" | "limit", // Hardcoding for now as OrderPanel manages this
    side: "long" as "long" | "short", // Hardcoding for now as OrderPanel manages this
    leverage,
    setLeverage,
    currentPrice,
    currentLiqPrice,
    handlePlaceOrder,

    // State/Data for Positions Table
    positions,
    getPositionActions,
    
    // State/Data for Header
    tradeMode,
    setTradeMode,
  };
}
// --- END OF MOCK TRADING HOOK CONCEPT ---
