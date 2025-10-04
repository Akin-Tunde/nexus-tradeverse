import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coins, TrendingUp, ArrowDownToLine } from "lucide-react";

const Earn = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header tradeMode="futures" onTradeModeChange={() => {}} />
      
      <div className="container mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Earn as a Liquidity Provider</h1>
          <p className="text-muted-foreground">Deposit assets and earn a share of platform revenue</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 border-border bg-card">
            <div className="flex items-center gap-3 mb-2">
              <Coins className="h-5 w-5 text-premium" />
              <span className="text-sm text-muted-foreground">USDC Pool APR</span>
            </div>
            <div className="text-3xl font-bold font-mono text-premium">12.5%</div>
          </Card>

          <Card className="p-6 border-border bg-card">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="h-5 w-5 text-premium" />
              <span className="text-sm text-muted-foreground">ETH Pool APR</span>
            </div>
            <div className="text-3xl font-bold font-mono text-premium">8.3%</div>
          </Card>

          <Card className="p-6 border-border bg-card">
            <div className="flex items-center gap-3 mb-2">
              <Coins className="h-5 w-5 text-premium" />
              <span className="text-sm text-muted-foreground">BTC Pool APR</span>
            </div>
            <div className="text-3xl font-bold font-mono text-premium">6.7%</div>
          </Card>
        </div>

        <Card className="border-border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Deposit & Earn</h2>
          <div className="p-8 text-center text-muted-foreground border border-dashed border-border rounded-lg">
            <Coins className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <div className="text-sm mb-4">Start earning passive income by providing liquidity</div>
            <Button className="bg-primary hover:bg-primary/90">
              <ArrowDownToLine className="h-4 w-4 mr-2" />
              Deposit Assets
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Earn;
