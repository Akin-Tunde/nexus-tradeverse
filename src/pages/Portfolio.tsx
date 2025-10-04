import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ArrowDownToLine, ArrowUpFromLine, TrendingUp, Wallet } from "lucide-react";

interface Asset {
  symbol: string;
  name: string;
  balance: number;
  value: number;
  yieldAPR: number;
  collateralWeight: number;
  asCollateral: boolean;
}

const mockAssets: Asset[] = [
  { symbol: "USDC", name: "USD Coin", balance: 10000, value: 10000, yieldAPR: 4.2, collateralWeight: 1.0, asCollateral: true },
  { symbol: "USDT", name: "Tether", balance: 5000, value: 5000, yieldAPR: 3.8, collateralWeight: 1.0, asCollateral: true },
  { symbol: "BTC", name: "Bitcoin", balance: 0.5, value: 21625, yieldAPR: 0, collateralWeight: 0.85, asCollateral: false },
  { symbol: "ETH", name: "Ethereum", balance: 5.0, value: 11403, yieldAPR: 3.2, collateralWeight: 0.8, asCollateral: true },
  { symbol: "SOL", name: "Solana", balance: 50, value: 4922, yieldAPR: 5.7, collateralWeight: 0.7, asCollateral: false },
];

const Portfolio = () => {
  const totalValue = mockAssets.reduce((sum, asset) => sum + asset.value, 0);
  const collateralValue = mockAssets
    .filter(a => a.asCollateral)
    .reduce((sum, asset) => sum + asset.value * asset.collateralWeight, 0);
  const usedMargin = 8500;
  const availableMargin = collateralValue - usedMargin;
  const unrealizedPnL = 321.50;

  return (
    <div className="min-h-screen bg-background">
      <Header tradeMode="futures" onTradeModeChange={() => {}} />
      
      <div className="container mx-auto p-6 space-y-6">
        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6 border-border bg-card">
            <div className="flex items-center gap-3 mb-2">
              <Wallet className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Total Value</span>
            </div>
            <div className="text-3xl font-bold font-mono">${totalValue.toLocaleString()}</div>
          </Card>

          <Card className="p-6 border-border bg-card">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Available Margin</span>
            </div>
            <div className="text-3xl font-bold font-mono text-long">${availableMargin.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-1">
              Used: ${usedMargin.toLocaleString()}
            </div>
          </Card>

          <Card className="p-6 border-border bg-card">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm text-muted-foreground">Collateral Value</span>
            </div>
            <div className="text-3xl font-bold font-mono">${collateralValue.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-1">
              Risk-adjusted
            </div>
          </Card>

          <Card className="p-6 border-border bg-card">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm text-muted-foreground">Unrealized PnL</span>
            </div>
            <div className={`text-3xl font-bold font-mono ${unrealizedPnL > 0 ? 'text-long' : 'text-short'}`}>
              {unrealizedPnL > 0 ? '+' : ''}${unrealizedPnL.toFixed(2)}
            </div>
            <div className={`text-xs mt-1 ${unrealizedPnL > 0 ? 'text-long' : 'text-short'}`}>
              +0.62%
            </div>
          </Card>
        </div>

        {/* Asset Balances Table */}
        <Card className="border-border bg-card">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Asset Balances & Collateral Status</h2>
              <Button className="bg-primary hover:bg-primary/90">
                <ArrowDownToLine className="h-4 w-4 mr-2" />
                Fiat On/Off-Ramp
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-sm text-muted-foreground">
                    <th className="text-left p-3 font-medium">Asset</th>
                    <th className="text-right p-3 font-medium">Balance</th>
                    <th className="text-right p-3 font-medium">Value (USD)</th>
                    <th className="text-right p-3 font-medium">Yield (APR)</th>
                    <th className="text-right p-3 font-medium">Collateral Weight</th>
                    <th className="text-center p-3 font-medium">As Collateral?</th>
                    <th className="text-right p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockAssets.map((asset) => (
                    <tr key={asset.symbol} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="p-3">
                        <div>
                          <div className="font-semibold">{asset.symbol}</div>
                          <div className="text-xs text-muted-foreground">{asset.name}</div>
                        </div>
                      </td>
                      <td className="p-3 text-right font-mono">{asset.balance.toLocaleString()}</td>
                      <td className="p-3 text-right font-mono font-semibold">${asset.value.toLocaleString()}</td>
                      <td className="p-3 text-right">
                        {asset.yieldAPR > 0 ? (
                          <Badge variant="outline" className="text-long border-long">
                            {asset.yieldAPR.toFixed(1)}% APR
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="p-3 text-right font-mono">{(asset.collateralWeight * 100).toFixed(0)}%</td>
                      <td className="p-3">
                        <div className="flex items-center justify-center">
                          <Switch checked={asset.asCollateral} />
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center justify-end gap-2">
                          <Button size="sm" variant="outline">
                            <ArrowDownToLine className="h-3 w-3 mr-1" />
                            Deposit
                          </Button>
                          <Button size="sm" variant="outline">
                            <ArrowUpFromLine className="h-3 w-3 mr-1" />
                            Withdraw
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        {/* Capital Efficiency Info */}
        <Card className="border-border bg-card p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Maximize Capital Efficiency</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Your assets are earning passive yield while being held in your wallet. Toggle "As Collateral" 
                to include specific assets in your cross-margin pool for leveraged trading.
              </p>
              <Button variant="link" className="p-0 h-auto text-primary">
                Learn more about collateral management →
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Portfolio;
