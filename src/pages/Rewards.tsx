import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Zap, Gift, CheckCircle2 } from "lucide-react";

interface Quest {
  id: number;
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
}

const dailyQuests: Quest[] = [
  { id: 1, title: "Trade $10,000 Volume", description: "Execute trades totaling $10k in volume", xpReward: 50, completed: true },
  { id: 2, title: "Open 3 Positions", description: "Open at least 3 trading positions today", xpReward: 30, completed: false },
  { id: 3, title: "Win 2 Trades", description: "Close 2 profitable positions", xpReward: 40, completed: false },
];

const Rewards = () => {
  const currentXP = 2840;
  const currentTier = "Gold Trader";
  const nextTier = "Platinum Trader";
  const xpToNextTier = 3500;
  const xpProgress = (currentXP / xpToNextTier) * 100;
  const tradingFeeDiscount = 15;

  return (
    <div className="min-h-screen bg-background">
      <Header tradeMode="futures" onTradeModeChange={() => {}} />
      
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">My Rewards & Loyalty</h1>
          <p className="text-muted-foreground">Earn XP, climb tiers, and unlock exclusive rewards</p>
        </div>

        {/* Tier Status Card */}
        <Card className="border-border bg-gradient-to-br from-card to-premium/5 p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-full bg-premium/20">
                <Trophy className="h-8 w-8 text-premium" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Current Tier</div>
                <div className="text-3xl font-bold text-premium">{currentTier}</div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm text-muted-foreground mb-1">Trading Fee Discount</div>
              <div className="text-3xl font-bold text-long">{tradingFeeDiscount}%</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress to {nextTier}</span>
              <span className="font-mono font-semibold">{currentXP} / {xpToNextTier} XP</span>
            </div>
            <Progress value={xpProgress} className="h-3" />
            <div className="text-xs text-muted-foreground">
              {xpToNextTier - currentXP} XP needed for next tier
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Daily Quests */}
          <Card className="border-border bg-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Daily Quests</h2>
                <p className="text-xs text-muted-foreground">Complete tasks to earn bonus XP</p>
              </div>
            </div>

            <div className="space-y-3">
              {dailyQuests.map((quest) => (
                <div 
                  key={quest.id}
                  className={`p-4 rounded-lg border transition-colors ${
                    quest.completed 
                      ? "bg-long/10 border-long/30" 
                      : "bg-muted/30 border-border hover:border-primary"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sm">{quest.title}</h3>
                        {quest.completed && <CheckCircle2 className="h-4 w-4 text-long" />}
                      </div>
                      <p className="text-xs text-muted-foreground">{quest.description}</p>
                    </div>
                    <Badge variant="outline" className="ml-2">
                      <Star className="h-3 w-3 mr-1 text-premium" />
                      +{quest.xpReward} XP
                    </Badge>
                  </div>
                  {quest.completed && (
                    <Button size="sm" disabled className="w-full mt-2">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Completed
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Rewards Store */}
          <Card className="border-border bg-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Gift className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Rewards Store</h2>
                <p className="text-xs text-muted-foreground">Redeem your XP for exclusive items</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-muted/30 border border-border hover:border-primary transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-sm mb-1">Platform Token Airdrop</h3>
                    <p className="text-xs text-muted-foreground">100 governance tokens</p>
                  </div>
                  <Badge variant="outline" className="text-premium border-premium">
                    500 XP
                  </Badge>
                </div>
                <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                  Redeem
                </Button>
              </div>

              <div className="p-4 rounded-lg bg-muted/30 border border-border hover:border-primary transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-sm mb-1">Exclusive NFT Badge</h3>
                    <p className="text-xs text-muted-foreground">Limited edition profile badge</p>
                  </div>
                  <Badge variant="outline" className="text-premium border-premium">
                    750 XP
                  </Badge>
                </div>
                <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                  Redeem
                </Button>
              </div>

              <div className="p-4 rounded-lg bg-muted/30 border border-border hover:border-primary transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-sm mb-1">Premium Analytics Access</h3>
                    <p className="text-xs text-muted-foreground">30 days of advanced tools</p>
                  </div>
                  <Badge variant="outline" className="text-premium border-premium">
                    1000 XP
                  </Badge>
                </div>
                <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                  Redeem
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Tier Benefits */}
        <Card className="border-border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Tier Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {["Bronze", "Silver", "Gold", "Platinum"].map((tier, index) => (
              <div 
                key={tier}
                className={`p-4 rounded-lg border ${
                  tier === currentTier 
                    ? "bg-premium/10 border-premium" 
                    : "bg-muted/30 border-border"
                }`}
              >
                <div className="text-center">
                  <Trophy className={`h-6 w-6 mx-auto mb-2 ${
                    tier === currentTier ? "text-premium" : "text-muted-foreground"
                  }`} />
                  <div className="font-semibold mb-1">{tier}</div>
                  <div className="text-xs text-muted-foreground mb-2">
                    {index * 5}% Fee Discount
                  </div>
                  {tier === currentTier && (
                    <Badge variant="outline" className="text-premium border-premium text-xs">
                      Current Tier
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Rewards;
