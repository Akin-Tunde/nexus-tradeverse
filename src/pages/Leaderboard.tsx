import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, TrendingUp, Users, Copy } from "lucide-react";
import { toast } from "sonner";

interface Trader {
  rank: number;
  address: string;
  pnl: number;
  winRate: number;
  volume: string;
  followers: number;
  avgRisk: string;
}

const mockTraders: Trader[] = [
  { rank: 1, address: "0x7a3...f2c", pnl: 125420, winRate: 78.5, volume: "12.5M", followers: 1250, avgRisk: "Medium" },
  { rank: 2, address: "0x9b2...d4e", pnl: 98340, winRate: 72.3, volume: "8.7M", followers: 890, avgRisk: "High" },
  { rank: 3, address: "0x4c1...a8f", pnl: 87230, winRate: 81.2, volume: "6.2M", followers: 2100, avgRisk: "Low" },
  { rank: 4, address: "0x2e5...b3d", pnl: 76150, winRate: 69.8, volume: "9.1M", followers: 670, avgRisk: "Medium" },
  { rank: 5, address: "0x6f8...c7a", pnl: 64820, winRate: 75.6, volume: "5.8M", followers: 450, avgRisk: "High" },
];

const Leaderboard = () => {
  const handleCopyTrader = (address: string) => {
    toast.success(`Now copying trader ${address}`, {
      description: "You'll automatically mirror their trades",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header tradeMode="futures" onTradeModeChange={() => {}} />
      
      <div className="container mx-auto p-6 space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Leaderboard & Copy Trading</h1>
            <p className="text-muted-foreground">Follow top traders and automatically copy their strategies</p>
          </div>
          <Button className="bg-premium hover:bg-premium/90 text-premium-foreground">
            <Trophy className="h-4 w-4 mr-2" />
            View My Rank
          </Button>
        </div>

        {/* Top Traders Table */}
        <Card className="border-border bg-card">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Top Traders (30 Days)</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-sm text-muted-foreground">
                    <th className="text-left p-3 font-medium">Rank</th>
                    <th className="text-left p-3 font-medium">Trader</th>
                    <th className="text-right p-3 font-medium">PnL (USD)</th>
                    <th className="text-right p-3 font-medium">Win Rate</th>
                    <th className="text-right p-3 font-medium">Volume</th>
                    <th className="text-right p-3 font-medium">Followers</th>
                    <th className="text-center p-3 font-medium">Risk Level</th>
                    <th className="text-right p-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTraders.map((trader) => (
                    <tr key={trader.rank} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="p-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted font-semibold">
                          {trader.rank === 1 && <Trophy className="h-4 w-4 text-premium" />}
                          {trader.rank !== 1 && trader.rank}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                              {trader.address.slice(2, 4).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-mono font-semibold">{trader.address}</span>
                        </div>
                      </td>
                      <td className="p-3 text-right">
                        <div className="font-mono font-semibold text-long">
                          +${trader.pnl.toLocaleString()}
                        </div>
                      </td>
                      <td className="p-3 text-right">
                        <Badge variant="outline" className="text-long border-long">
                          {trader.winRate.toFixed(1)}%
                        </Badge>
                      </td>
                      <td className="p-3 text-right font-mono">${trader.volume}</td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          <span className="font-mono">{trader.followers.toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        <Badge 
                          variant="outline"
                          className={
                            trader.avgRisk === "Low" ? "text-long border-long" :
                            trader.avgRisk === "High" ? "text-short border-short" :
                            ""
                          }
                        >
                          {trader.avgRisk}
                        </Badge>
                      </td>
                      <td className="p-3 text-right">
                        <Button 
                          size="sm" 
                          className="bg-primary hover:bg-primary/90"
                          onClick={() => handleCopyTrader(trader.address)}
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          COPY
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        {/* Your Copy Trading Dashboard */}
        <Card className="border-border bg-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Copy className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Your Copy Trading Dashboard</h2>
          </div>

          <div className="p-8 text-center text-muted-foreground border border-dashed border-border rounded-lg">
            <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <div className="text-sm mb-2">You're not copying any traders yet</div>
            <div className="text-xs">Click "COPY" on a trader above to start mirroring their trades</div>
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Leaderboard;
