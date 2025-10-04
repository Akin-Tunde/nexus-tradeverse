import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Info } from "lucide-react";
import { toast } from "sonner";

interface OrderPanelProps {
  market: string;
}

export const OrderPanel = ({ market }: OrderPanelProps) => {
  const [orderType, setOrderType] = useState<"market" | "limit">("limit");
  const [side, setSide] = useState<"long" | "short">("long");
  const [leverage, setLeverage] = useState([10]);
  const [collateral, setCollateral] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");

  const availableMargin = 10000; // USDC
  const currentPrice = 43250.50;
  const estimatedLiqPrice = currentPrice * (1 - 0.9 / leverage[0]);

  const handlePlaceOrder = () => {
    toast.success(`${side === "long" ? "Long" : "Short"} order placed for ${market}`, {
      description: `Size: ${size} | Leverage: ${leverage[0]}x`,
    });
  };

  return (
    <Card className="w-80 border-border bg-card p-4 space-y-4">
      {/* Order Type Tabs */}
      <Tabs value={orderType} onValueChange={(v) => setOrderType(v as "market" | "limit")}>
        <TabsList className="grid w-full grid-cols-2 bg-muted">
          <TabsTrigger value="limit">Limit</TabsTrigger>
          <TabsTrigger value="market">Market</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Long/Short Toggle */}
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant={side === "long" ? "default" : "outline"}
          className={side === "long" ? "bg-long hover:bg-long-hover" : ""}
          onClick={() => setSide("long")}
        >
          Long
        </Button>
        <Button
          variant={side === "short" ? "default" : "outline"}
          className={side === "short" ? "bg-short hover:bg-short-hover" : ""}
          onClick={() => setSide("short")}
        >
          Short
        </Button>
      </div>

      {/* Leverage Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm">Leverage</Label>
          <span className="text-sm font-mono font-semibold text-primary">{leverage[0]}x</span>
        </div>
        <Slider
          value={leverage}
          onValueChange={setLeverage}
          min={1}
          max={50}
          step={1}
          className="[&_[role=slider]]:bg-primary"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>1x</span>
          <span>25x</span>
          <span>50x</span>
        </div>
      </div>

      {/* Price Input (only for limit orders) */}
      {orderType === "limit" && (
        <div className="space-y-2">
          <Label htmlFor="price" className="text-sm">Price (USD)</Label>
          <Input
            id="price"
            type="number"
            placeholder={currentPrice.toString()}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="font-mono bg-background border-border"
          />
        </div>
      )}

      {/* Size Input */}
      <div className="space-y-2">
        <Label htmlFor="size" className="text-sm">Size ({market.replace("USD", "")})</Label>
        <Input
          id="size"
          type="number"
          placeholder="0.00"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="font-mono bg-background border-border"
        />
      </div>

      {/* Collateral Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="collateral" className="text-sm">Collateral (USDC)</Label>
          <span className="text-xs text-muted-foreground">
            Available: ${availableMargin.toLocaleString()}
          </span>
        </div>
        <Input
          id="collateral"
          type="number"
          placeholder="0.00"
          value={collateral}
          onChange={(e) => setCollateral(e.target.value)}
          className="font-mono bg-background border-border"
        />
      </div>

      {/* Order Summary */}
      <div className="p-3 rounded-md bg-muted/50 border border-border space-y-1.5 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Entry Price</span>
          <span className="font-mono">${currentPrice.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground flex items-center gap-1">
            Liquidation Price
            <Info className="h-3 w-3" />
          </span>
          <span className="font-mono text-destructive">${estimatedLiqPrice.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Trading Fee</span>
          <span className="font-mono">0.06%</span>
        </div>
      </div>

      {/* Place Order Button */}
      <Button
        onClick={handlePlaceOrder}
        className={`w-full ${
          side === "long" 
            ? "bg-long hover:bg-long-hover" 
            : "bg-short hover:bg-short-hover"
        }`}
        size="lg"
      >
        {side === "long" ? "Open Long" : "Open Short"} {market.replace("USD", "")}
      </Button>

      {/* Additional Actions */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <Button variant="outline" size="sm">
          Add TP/SL
        </Button>
        <Button variant="outline" size="sm">
          Advanced
        </Button>
      </div>
    </Card>
  );
};
