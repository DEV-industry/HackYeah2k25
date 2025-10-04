import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import DashboardPage from "@/pages/DashboardPage";
import ZUSHeader from "./components/ZUSHeader";
function Router() {
  return (
    <Switch>
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ZUSHeader />
      <TooltipProvider>
        {/* Globalny header/layout masz już w projekcie */}
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
