import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, X, Edit } from "lucide-react";

interface Position {
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

const mockPositions: Position[] = [
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

export const PositionsTable = () => {
  return (
    <Card className="border-border bg-card">
      <Tabs defaultValue="positions" className="w-full">
        <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent p-0">
          <TabsTrigger value="positions" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
            Open Positions ({mockPositions.length})
          </TabsTrigger>
          <TabsTrigger value="orders" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
            Order History
          </TabsTrigger>
          <TabsTrigger value="trades" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
            Trade History
          </TabsTrigger>
          <TabsTrigger value="funding" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
            Funding History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="positions" className="m-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground">
                  <th className="text-left p-3 font-medium">Market</th>
                  <th className="text-left p-3 font-medium">Side</th>
                  <th className="text-right p-3 font-medium">Size</th>
                  <th className="text-right p-3 font-medium">Entry Price</th>
                  <th className="text-right p-3 font-medium">Mark Price</th>
                  <th className="text-right p-3 font-medium">Liq. Price</th>
                  <th className="text-right p-3 font-medium">PnL</th>
                  <th className="text-right p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockPositions.map((position) => (
                  <tr key={position.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{position.market}</span>
                        <Badge variant="outline" className="text-xs">
                          {position.leverage}x
                        </Badge>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge 
                        variant={position.side === "long" ? "default" : "destructive"}
                        className={position.side === "long" ? "bg-long" : "bg-short"}
                      >
                        {position.side === "long" ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {position.side.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="p-3 text-right font-mono text-sm">{position.size}</td>
                    <td className="p-3 text-right font-mono text-sm">${position.entryPrice.toLocaleString()}</td>
                    <td className="p-3 text-right font-mono text-sm">${position.markPrice.toLocaleString()}</td>
                    <td className="p-3 text-right font-mono text-sm text-destructive">
                      ${position.liquidationPrice.toLocaleString()}
                    </td>
                    <td className="p-3 text-right">
                      <div className={`font-mono font-semibold ${position.pnl > 0 ? "text-long" : "text-short"}`}>
                        {position.pnl > 0 ? "+" : ""}${position.pnl.toFixed(2)}
                      </div>
                      <div className={`text-xs ${position.pnl > 0 ? "text-long" : "text-short"}`}>
                        {position.pnl > 0 ? "+" : ""}{position.pnlPercent.toFixed(2)}%
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center justify-end gap-1">
                        <Button size="sm" variant="ghost" className="h-7 px-2">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-7 px-2 text-destructive hover:text-destructive">
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="m-0">
          <div className="p-8 text-center text-muted-foreground">
            <div className="text-sm">No order history</div>
          </div>
        </TabsContent>

        <TabsContent value="trades" className="m-0">
          <div className="p-8 text-center text-muted-foreground">
            <div className="text-sm">No trade history</div>
          </div>
        </TabsContent>

        <TabsContent value="funding" className="m-0">
          <div className="p-8 text-center text-muted-foreground">
            <div className="text-sm">No funding history</div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
