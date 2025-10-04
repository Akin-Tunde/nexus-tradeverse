import { Link, useLocation } from "react-router-dom";
import { TrendingUp, Wallet, Trophy, Brain, BarChart3, Vote, Gift } from "lucide-react";

const footerItems = [
  { path: "/", icon: TrendingUp, label: "Trade" },
  { path: "/portfolio", icon: Wallet, label: "Portfolio" },
  { path: "/leaderboard", icon: Trophy, label: "Leaderboard" },
  { path: "/ai-hub", icon: Brain, label: "AI Hub" },
  { path: "/stats", icon: BarChart3, label: "Stats" },
  { path: "/governance", icon: Vote, label: "Governance" },
  { path: "/rewards", icon: Gift, label: "Rewards" },
];

export const Footer = () => {
  const location = useLocation();

  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t border-border bg-card/95 backdrop-blur-sm z-40 shadow-elevation">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around py-3">
          {footerItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-primary" : ""}`} />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
};
