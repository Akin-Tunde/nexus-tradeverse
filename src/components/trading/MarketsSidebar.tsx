// FILE: src/components/trading/MarketsSidebar.tsx (Updated)
import { useState, useMemo } from "react"; // Use React's hook API for compatibility if we refactor hook location
import { Search, TrendingUp, TrendingDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useTradingData } from "@/components/ui/use-toast"; // <-- NEW IMPORT

// Removed Market interface and MOCK_MARKETS array as they are now in the hook

interface MarketsSidebarProps {
  // selectedMarket: string; // REMOVED
  // onSelectMarket: (symbol: string) => void; // REMOVED
}

export const MarketsSidebar = ({}: MarketsSidebarProps) => { // REMOVED props
  const { 
    markets, 
    selectedMarket, 
    setSelectedMarket, 
    sortBy, 
    setSortBy, 
    searchTerm, 
    setSearchTerm 
  } = useTradingData(); // <-- USE HOOK

  // Removed local state (searchTerm, sortBy, filteredMarkets)

  return (
    <div className="w-64 border-r border-border bg-card flex flex-col h-full">
      {/* Search */}
      <div className="p-3 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search markets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // <-- USE SETTER
            className="pl-9 bg-background border-border"
          />
        </div>
      </div>

      {/* Sort options */}
      <div className="flex gap-1 p-2 border-b border-border">
        <Button
          variant={sortBy === "volume" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setSortBy("volume")} // <-- USE SETTER
          className="flex-1 text-xs"
        >
          Volume
        </Button>
        <Button
          variant={sortBy === "change" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setSortBy("change")} // <-- USE SETTER
          className="flex-1 text-xs"
        >
          Change
        </Button>
        <Button
          variant={sortBy === "price" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setSortBy("price")} // <-- USE SETTER
          className="flex-1 text-xs"
        >
          Price
        </Button>
      </div>

      {/* Markets list */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {markets.map((market) => ( // <-- USE DATA FROM HOOK
            <button
              key={market.symbol}
              onClick={() => setSelectedMarket(market.symbol)} // <-- USE SETTER
              className={`w-full p-3 rounded-md text-left transition-colors ${
                selectedMarket === market.symbol
                  ? "bg-secondary"
                  : "hover:bg-muted"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-sm">{market.symbol}</span>
                {market.change24h > 0 ? (
                  <TrendingUp className="h-3 w-3 text-long" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-short" />
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{market.name}</span>
                <span className={`text-xs font-medium ${
                  market.change24h > 0 ? "text-long" : "text-short"
                }`}>
                  {market.change24h > 0 ? "+" : ""}{market.change24h.toFixed(2)}%
                </span>
              </div>
              <div className="mt-1">
                <span className="text-sm font-mono">${market.price.toLocaleString()}</span>
              </div>
              <div className="mt-0.5">
                <span className="text-xs text-muted-foreground">Vol: {market.volume24h}</span>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
