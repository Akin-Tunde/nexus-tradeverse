import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ArrowDownToLine, ArrowUpFromLine, TrendingUp, TrendingDown, Search } from "lucide-react";

interface Transaction {
  id: string;
  type: "trade" | "deposit" | "withdrawal" | "funding";
  market?: string;
  side?: "long" | "short";
  asset?: string;
  amount: number;
  value: number;
  status: "completed" | "pending" | "failed";
  timestamp: string;
  txHash?: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "trade",
    market: "BTCUSD",
    side: "long",
    amount: 0.5,
    value: 21625,
    status: "completed",
    timestamp: "2025-01-04 14:32:15"
  },
  {
    id: "2",
    type: "deposit",
    asset: "USDC",
    amount: 5000,
    value: 5000,
    status: "completed",
    timestamp: "2025-01-04 10:15:42",
    txHash: "0x7a3f8c9b2e1d4a5c6f8b9e2d1a3c5f8b9e2d1a3c"
  },
  {
    id: "3",
    type: "trade",
    market: "ETHUSD",
    side: "short",
    amount: 5.0,
    value: 11403,
    status: "completed",
    timestamp: "2025-01-03 22:48:10"
  },
  {
    id: "4",
    type: "withdrawal",
    asset: "ETH",
    amount: 2.0,
    value: 4561,
    status: "pending",
    timestamp: "2025-01-03 18:20:05",
    txHash: "0x9b2c1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c"
  },
  {
    id: "5",
    type: "funding",
    market: "BTCUSD",
    amount: 0.5,
    value: 12.50,
    status: "completed",
    timestamp: "2025-01-03 16:00:00"
  },
];

const TransactionHistory = () => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowDownToLine className="h-4 w-4" />;
      case "withdrawal":
        return <ArrowUpFromLine className="h-4 w-4" />;
      case "trade":
        return <TrendingUp className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getTypeColor = (type: string, side?: string) => {
    if (type === "deposit") return "text-long";
    if (type === "withdrawal") return "text-short";
    if (type === "trade") {
      return side === "long" ? "text-long" : "text-short";
    }
    return "text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header tradeMode="futures" onTradeModeChange={() => {}} />
      
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Transaction History</h1>
          <p className="text-muted-foreground">View all your trading activity, deposits, and withdrawals</p>
        </div>

        {/* Filters */}
        <Card className="border-border bg-card p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by market, asset, or transaction hash..."
                className="pl-9 bg-background border-border"
              />
            </div>
          </div>
        </Card>

        {/* Transactions Table */}
        <Card className="border-border bg-card">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent p-0 px-6">
              <TabsTrigger value="all" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                All Transactions
              </TabsTrigger>
              <TabsTrigger value="trades" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                Trades
              </TabsTrigger>
              <TabsTrigger value="deposits" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                Deposits
              </TabsTrigger>
              <TabsTrigger value="withdrawals" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                Withdrawals
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="m-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border text-xs text-muted-foreground">
                      <th className="text-left p-4 font-medium">Type</th>
                      <th className="text-left p-4 font-medium">Market/Asset</th>
                      <th className="text-right p-4 font-medium">Amount</th>
                      <th className="text-right p-4 font-medium">Value (USD)</th>
                      <th className="text-center p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Timestamp</th>
                      <th className="text-left p-4 font-medium">TX Hash</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockTransactions.map((tx) => (
                      <tr key={tx.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className={getTypeColor(tx.type, tx.side)}>
                              {getTypeIcon(tx.type)}
                            </div>
                            <span className="text-sm font-medium capitalize">{tx.type}</span>
                            {tx.side && (
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${tx.side === "long" ? "text-long border-long" : "text-short border-short"}`}
                              >
                                {tx.side.toUpperCase()}
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="font-semibold">{tx.market || tx.asset}</span>
                        </td>
                        <td className="p-4 text-right font-mono">{tx.amount.toLocaleString()}</td>
                        <td className="p-4 text-right font-mono font-semibold">
                          ${tx.value.toLocaleString()}
                        </td>
                        <td className="p-4 text-center">
                          <Badge 
                            variant="outline"
                            className={
                              tx.status === "completed" ? "text-long border-long" :
                              tx.status === "pending" ? "text-primary border-primary" :
                              "text-short border-short"
                            }
                          >
                            {tx.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="text-sm font-mono">{tx.timestamp}</div>
                        </td>
                        <td className="p-4">
                          {tx.txHash ? (
                            <span className="text-xs font-mono text-primary hover:underline cursor-pointer">
                              {tx.txHash.slice(0, 10)}...{tx.txHash.slice(-8)}
                            </span>
                          ) : (
                            <span className="text-xs text-muted-foreground">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="trades" className="m-0">
              <div className="p-8 text-center text-muted-foreground">
                <div className="text-sm">Filtered trades will appear here</div>
              </div>
            </TabsContent>

            <TabsContent value="deposits" className="m-0">
              <div className="p-8 text-center text-muted-foreground">
                <div className="text-sm">Filtered deposits will appear here</div>
              </div>
            </TabsContent>

            <TabsContent value="withdrawals" className="m-0">
              <div className="p-8 text-center text-muted-foreground">
                <div className="text-sm">Filtered withdrawals will appear here</div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default TransactionHistory;
