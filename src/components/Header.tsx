import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, User, TrendingUp } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export type TradeMode = "futures" | "spot" | "options";

interface HeaderProps {
  tradeMode: TradeMode;
  onTradeModeChange: (mode: TradeMode) => void;
}

export const Header = ({ tradeMode, onTradeModeChange }: HeaderProps) => {
  const [isTradeOpen, setIsTradeOpen] = useState(false);

  const tradeModeLabels = {
    futures: "Futures",
    spot: "Spot",
    options: "Options",
  };

  return (
    <header className="h-14 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 shadow-elevation">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <TrendingUp className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">TradeX</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            {/* Trade Mode Selector */}
            <DropdownMenu open={isTradeOpen} onOpenChange={setIsTradeOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-1">
                  {tradeModeLabels[tradeMode]}
                  <ChevronDown className={`h-4 w-4 transition-transform ${isTradeOpen ? "rotate-180" : ""}`} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 bg-popover border-border">
                <DropdownMenuItem 
                  onClick={() => onTradeModeChange("futures")}
                  className="cursor-pointer"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium">Futures</span>
                    <span className="text-xs text-muted-foreground">Leveraged perpetuals</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onTradeModeChange("spot")}
                  className="cursor-pointer"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium">Spot</span>
                    <span className="text-xs text-muted-foreground">Direct asset trading</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onTradeModeChange("options")}
                  className="cursor-pointer"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium">Options</span>
                    <span className="text-xs text-muted-foreground">Calls & puts</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" asChild>
              <Link to="/earn">Earn</Link>
            </Button>

            <Button variant="ghost" asChild>
              <Link to="/portfolio">Portfolio</Link>
            </Button>

            <Button variant="ghost" asChild>
              <Link to="/leaderboard">Leaderboard</Link>
            </Button>

            <Button variant="ghost" asChild>
              <Link to="/ai-hub">AI Hub</Link>
            </Button>

            <Button variant="ghost" asChild>
              <Link to="/stats">Stats</Link>
            </Button>

            <Button variant="ghost" asChild>
              <Link to="/governance">Governance</Link>
            </Button>
          </nav>
        </div>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <User className="h-4 w-4" />
              <span className="font-mono text-sm">0x7a3...f2c</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-popover border-border">
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to="/rewards">My Rewards & Loyalty</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Wallet Info</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Transaction History</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-destructive">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
