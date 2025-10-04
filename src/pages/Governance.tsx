import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Vote, Plus, MessageSquare, Clock } from "lucide-react";

interface Proposal {
  id: number;
  title: string;
  status: "active" | "passed" | "failed";
  votesFor: number;
  votesAgainst: number;
  totalVotes: number;
  timeLeft: string;
  description: string;
}

const mockProposals: Proposal[] = [
  {
    id: 1,
    title: "Reduce Trading Fees by 10% for High Volume Traders",
    status: "active",
    votesFor: 8520000,
    votesAgainst: 2340000,
    totalVotes: 10860000,
    timeLeft: "2d 14h",
    description: "Proposal to reduce trading fees from 0.06% to 0.054% for traders with monthly volume > $1M"
  },
  {
    id: 2,
    title: "Add Support for New Collateral Assets (ARB, OP)",
    status: "active",
    votesFor: 6780000,
    votesAgainst: 1230000,
    totalVotes: 8010000,
    timeLeft: "5d 8h",
    description: "Expand the list of supported collateral to include Arbitrum (ARB) and Optimism (OP)"
  },
  {
    id: 3,
    title: "Increase Maximum Leverage to 100x",
    status: "failed",
    votesFor: 2340000,
    votesAgainst: 7890000,
    totalVotes: 10230000,
    timeLeft: "Ended",
    description: "Proposal to increase maximum leverage from 50x to 100x for experienced traders"
  },
];

const Governance = () => {
  const userVotingPower = 125000;
  const totalStaked = 45000000;

  return (
    <div className="min-h-screen bg-background">
      <Header tradeMode="futures" onTradeModeChange={() => {}} />
      
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Governance (DAO)</h1>
            <p className="text-muted-foreground">Shape the future of the protocol through community voting</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Create Proposal
          </Button>
        </div>

        {/* Voting Power Card */}
        <Card className="border-border bg-card p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Vote className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Your Voting Power</span>
              </div>
              <div className="text-3xl font-bold font-mono">{userVotingPower.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {((userVotingPower / totalStaked) * 100).toFixed(3)}% of total
              </div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground mb-2">Total Staked</div>
              <div className="text-3xl font-bold font-mono">{(totalStaked / 1000000).toFixed(1)}M</div>
              <div className="text-xs text-muted-foreground mt-1">Governance tokens</div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground mb-2">Active Proposals</div>
              <div className="text-3xl font-bold font-mono">
                {mockProposals.filter(p => p.status === "active").length}
              </div>
              <Button variant="link" className="p-0 h-auto text-xs text-primary mt-1">
                <MessageSquare className="h-3 w-3 mr-1" />
                Visit Governance Forum
              </Button>
            </div>
          </div>
        </Card>

        {/* Proposals List */}
        <div className="space-y-4">
          {mockProposals.map((proposal) => (
            <Card key={proposal.id} className="border-border bg-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{proposal.title}</h3>
                    <Badge 
                      variant={
                        proposal.status === "active" ? "default" :
                        proposal.status === "passed" ? "outline" : "destructive"
                      }
                      className={
                        proposal.status === "active" ? "bg-primary" :
                        proposal.status === "passed" ? "text-long border-long" : ""
                      }
                    >
                      {proposal.status === "active" && <Clock className="h-3 w-3 mr-1" />}
                      {proposal.status.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{proposal.description}</p>
                </div>
              </div>

              {/* Voting Progress */}
              <div className="space-y-3 mb-4">
                <div>
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span className="text-long font-medium">For: {proposal.votesFor.toLocaleString()}</span>
                    <span className="text-muted-foreground">
                      {((proposal.votesFor / proposal.totalVotes) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress 
                    value={(proposal.votesFor / proposal.totalVotes) * 100} 
                    className="h-2"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span className="text-short font-medium">Against: {proposal.votesAgainst.toLocaleString()}</span>
                    <span className="text-muted-foreground">
                      {((proposal.votesAgainst / proposal.totalVotes) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress 
                    value={(proposal.votesAgainst / proposal.totalVotes) * 100} 
                    className="h-2"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="text-sm text-muted-foreground">
                  {proposal.status === "active" ? (
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>Voting ends in {proposal.timeLeft}</span>
                    </div>
                  ) : (
                    <span>{proposal.timeLeft}</span>
                  )}
                </div>

                {proposal.status === "active" && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="text-long border-long hover:bg-long hover:text-long-foreground">
                      Vote For
                    </Button>
                    <Button variant="outline" size="sm" className="text-short border-short hover:bg-short hover:text-short-foreground">
                      Vote Against
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Governance;
