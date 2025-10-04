import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Sparkles, TrendingUp, Play, Pause } from "lucide-react";

const AIHub = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Header tradeMode="futures" onTradeModeChange={() => {}} />
      
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">AI Hub & Strategy Builder</h1>
          <p className="text-muted-foreground">Leverage AI-powered insights and build automated trading strategies</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI Insights */}
          <Card className="border-border bg-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Brain className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">AI Market Insights</h2>
                <p className="text-xs text-muted-foreground">Real-time analysis for BTCUSD</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-premium" />
                  <span className="text-sm font-semibold">Social Sentiment</span>
                  <Badge variant="outline" className="text-long border-long">Bullish</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  High positive sentiment across social channels. Notable increase in bullish mentions (+42% vs 24h ago).
                </p>
              </div>

              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold">On-Chain Analysis</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Whale accumulation detected. Large holder balances increased by 2.3% in the last 48 hours.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-long/10 border border-long">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-long" />
                  <span className="text-sm font-semibold text-long">Potential Trade Signal</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Based on technical patterns and sentiment analysis, consider a long position.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-xs text-muted-foreground">Entry</div>
                    <div className="font-mono font-semibold">$43,200 - $43,400</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Target</div>
                    <div className="font-mono font-semibold text-long">$45,800</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Stop Loss</div>
                    <div className="font-mono font-semibold text-short">$42,100</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Risk/Reward</div>
                    <div className="font-mono font-semibold">1:2.4</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Strategy Builder */}
          <Card className="border-border bg-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Brain className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Strategy Builder</h2>
                <p className="text-xs text-muted-foreground">No-code automation</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-dashed border-border">
                <div className="text-center text-muted-foreground py-8">
                  <Brain className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <div className="text-sm mb-2">No strategies created yet</div>
                  <div className="text-xs mb-4">Build your first automated trading bot</div>
                  <Button className="bg-primary hover:bg-primary/90">
                    Create New Strategy
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold">Popular Strategy Templates</h3>
                <div className="space-y-2">
                  <div className="p-3 rounded-lg bg-muted/30 border border-border hover:border-primary transition-colors cursor-pointer">
                    <div className="font-medium text-sm mb-1">RSI Reversal</div>
                    <div className="text-xs text-muted-foreground">
                      Long when RSI &lt; 30, Short when RSI &gt; 70
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30 border border-border hover:border-primary transition-colors cursor-pointer">
                    <div className="font-medium text-sm mb-1">Moving Average Crossover</div>
                    <div className="text-xs text-muted-foreground">
                      Trade based on 50/200 MA crosses
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30 border border-border hover:border-primary transition-colors cursor-pointer">
                    <div className="font-medium text-sm mb-1">Breakout Strategy</div>
                    <div className="text-xs text-muted-foreground">
                      Enter on price breaking key levels
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Active Strategies */}
        <Card className="border-border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Active Strategies</h2>
          <div className="p-8 text-center text-muted-foreground border border-dashed border-border rounded-lg">
            <div className="text-sm">No active strategies running</div>
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default AIHub;
