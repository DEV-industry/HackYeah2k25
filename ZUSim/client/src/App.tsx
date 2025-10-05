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
import { useLocation } from "wouter";
import { useEffect } from "react";

function ScrollManager() {
  const [location] = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  return null;
}

function Router() {
  return (
    <>
    <ScrollManager />
    <Switch>
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
    </>
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
