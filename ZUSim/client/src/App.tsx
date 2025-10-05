import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import DashboardPage from "@/pages/DashboardPage";
import ZUSHeader from "./components/ZUSHeader";
import { SimulationProvider } from "../src/context/SimulationContext";
import Footer from "./components/Footer";

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
        <SimulationProvider>
          <Toaster />
          <Router />
        </SimulationProvider>
      </TooltipProvider>
      <Footer />
    </QueryClientProvider>
  );
}

export default App;
