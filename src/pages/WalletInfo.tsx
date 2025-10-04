import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, Copy, ExternalLink, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface WalletBalance {
  symbol: string;
  name: string;
  balance: number;
  value: number;
}

const mockBalances: WalletBalance[] = [
  { symbol: "USDC", name: "USD Coin", balance: 10000, value: 10000 },
  { symbol: "USDT", name: "Tether", balance: 5000, value: 5000 },
  { symbol: "BTC", name: "Bitcoin", balance: 0.5, value: 21625 },
  { symbol: "ETH", name: "Ethereum", balance: 5.0, value: 11403 },
  { symbol: "SOL", name: "Solana", balance: 50, value: 4922 },
];

const WalletInfo = () => {
  const walletAddress = "0x7a3f8c9b2e1d4a5c6f8b9e2d1a3c5f8b9e2d1a3c";
  const shortAddress = "0x7a3...f2c";
  const totalBalance = mockBalances.reduce((sum, b) => sum + b.value, 0);
  const network = "Ethereum Mainnet";

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    toast.success("Wallet address copied to clipboard");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header tradeMode="futures" onTradeModeChange={() => {}} />
      
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Wallet Information</h1>
          <p className="text-muted-foreground">View your connected wallet details and balances</p>
        </div>

        {/* Wallet Overview */}
        <Card className="border-border bg-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-primary/10">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Connected Wallet</div>
                <div className="font-mono text-lg font-semibold">{shortAddress}</div>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleCopyAddress}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Address
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-muted/30">
              <div className="text-sm text-muted-foreground mb-1">Total Balance</div>
              <div className="text-2xl font-bold font-mono">${totalBalance.toLocaleString()}</div>
            </div>

            <div className="p-4 rounded-lg bg-muted/30">
              <div className="text-sm text-muted-foreground mb-1">Network</div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-long border-long">
                  {network}
                </Badge>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-muted/30">
              <div className="text-sm text-muted-foreground mb-1">Full Address</div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono truncate">{walletAddress}</span>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Token Balances */}
        <Card className="border-border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Token Balances</h2>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-sm text-muted-foreground">
                  <th className="text-left p-3 font-medium">Asset</th>
                  <th className="text-right p-3 font-medium">Balance</th>
                  <th className="text-right p-3 font-medium">Value (USD)</th>
                  <th className="text-right p-3 font-medium">% of Portfolio</th>
                </tr>
              </thead>
              <tbody>
                {mockBalances.map((balance) => (
                  <tr key={balance.symbol} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="p-3">
                      <div>
                        <div className="font-semibold">{balance.symbol}</div>
                        <div className="text-xs text-muted-foreground">{balance.name}</div>
                      </div>
                    </td>
                    <td className="p-3 text-right font-mono">{balance.balance.toLocaleString()}</td>
                    <td className="p-3 text-right font-mono font-semibold">
                      ${balance.value.toLocaleString()}
                    </td>
                    <td className="p-3 text-right text-muted-foreground">
                      {((balance.value / totalBalance) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Security Info */}
        <Card className="border-border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Security Information</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <span className="text-muted-foreground">Wallet Type</span>
              <span className="font-medium">MetaMask</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <span className="text-muted-foreground">Connection Status</span>
              <Badge variant="outline" className="text-long border-long">Connected</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <span className="text-muted-foreground">Last Activity</span>
              <span className="font-medium">2 minutes ago</span>
            </div>
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default WalletInfo;
