import { useState } from "react";
import { Search, TrendingUp, TrendingDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface Market {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: string;
}

const markets: Market[] = [
  { symbol: "BTCUSD", name: "Bitcoin", price: 43250.50, change24h: 2.34, volume24h: "12.5B" },
  { symbol: "ETHUSD", name: "Ethereum", price: 2280.75, change24h: -1.23, volume24h: "8.2B" },
  { symbol: "SOLUSD", name: "Solana", price: 98.45, change24h: 5.67, volume24h: "1.8B" },
  { symbol: "BNBUSD", name: "BNB", price: 312.80, change24h: 0.89, volume24h: "980M" },
  { symbol: "ADAUSD", name: "Cardano", price: 0.5234, change24h: -2.45, volume24h: "650M" },
  { symbol: "XRPUSD", name: "Ripple", price: 0.6123, change24h: 1.78, volume24h: "1.2B" },
  { symbol: "DOTUSD", name: "Polkadot", price: 7.89, change24h: 3.21, volume24h: "420M" },
  { symbol: "DOGEUSD", name: "Dogecoin", price: 0.0823, change24h: -0.56, volume24h: "580M" },
];

interface MarketsSidebarProps {
  selectedMarket: string;
  onSelectMarket: (symbol: string) => void;
}

export const MarketsSidebar = ({ selectedMarket, onSelectMarket }: MarketsSidebarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"volume" | "change" | "price">("volume");

  const filteredMarkets = markets
    .filter(m => 
      m.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "volume") return parseFloat(b.volume24h) - parseFloat(a.volume24h);
      if (sortBy === "change") return b.change24h - a.change24h;
      return b.price - a.price;
    });

  return (
    <div className="w-64 border-r border-border bg-card flex flex-col h-full">
      {/* Search */}
      <div className="p-3 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search markets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-background border-border"
          />
        </div>
      </div>

      {/* Sort options */}
      <div className="flex gap-1 p-2 border-b border-border">
        <Button
          variant={sortBy === "volume" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setSortBy("volume")}
          className="flex-1 text-xs"
        >
          Volume
        </Button>
        <Button
          variant={sortBy === "change" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setSortBy("change")}
          className="flex-1 text-xs"
        >
          Change
        </Button>
        <Button
          variant={sortBy === "price" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setSortBy("price")}
          className="flex-1 text-xs"
        >
          Price
        </Button>
      </div>

      {/* Markets list */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {filteredMarkets.map((market) => (
            <button
              key={market.symbol}
              onClick={() => onSelectMarket(market.symbol)}
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
