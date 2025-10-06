import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";

import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import Leaderboard from "./pages/Leaderboard";
import AIHub from "./pages/AIHub";
import Governance from "./pages/Governance";
import Rewards from "./pages/Rewards";
import Stats from "./pages/Stats";
import Earn from "./pages/Earn";
import WalletInfo from "./pages/WalletInfo";
import TransactionHistory from "./pages/TransactionHistory";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  // The ThemeProvider should wrap all the other components
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/ai-hub" element={<AIHub />} />
            <Route path="/governance" element={<Governance />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/earn" element={<Earn />} />
            <Route path="/wallet-info" element={<WalletInfo />} />
            <Route path="/transaction-history" element={<TransactionHistory />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;