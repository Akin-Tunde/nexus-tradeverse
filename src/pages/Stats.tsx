import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { TrendingUp, DollarSign, BarChart3, Users } from "lucide-react";

const Stats = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header tradeMode="futures" onTradeModeChange={() => {}} />
      
      <div className="container mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Platform Statistics</h1>
          <p className="text-muted-foreground">Real-time metrics and analytics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6 border-border bg-card">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Total Volume (24h)</span>
            </div>
            <div className="text-3xl font-bold font-mono">$1.2B</div>
            <div className="text-xs text-long mt-1">+12.5% vs yesterday</div>
          </Card>

          <Card className="p-6 border-border bg-card">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Total Value Locked</span>
            </div>
            <div className="text-3xl font-bold font-mono">$450M</div>
            <div className="text-xs text-long mt-1">+5.2% this week</div>
          </Card>

          <Card className="p-6 border-border bg-card">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Open Interest</span>
            </div>
            <div className="text-3xl font-bold font-mono">$680M</div>
            <div className="text-xs text-muted-foreground mt-1">Across all markets</div>
          </Card>

          <Card className="p-6 border-border bg-card">
            <div className="flex items-center gap-3 mb-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Active Traders</span>
            </div>
            <div className="text-3xl font-bold font-mono">24.5K</div>
            <div className="text-xs text-long mt-1">+8.3% this month</div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Stats;
