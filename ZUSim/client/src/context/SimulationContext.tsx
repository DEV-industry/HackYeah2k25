import React, { createContext, useContext, useState, ReactNode } from "react";
import { PensionResult } from "@/components/types";

interface SimulationData {
  age: number;
  gender: "male" | "female";
  salary: number;
  startYear: number;
  endYear: number;
  accountBalance?: number;
  subAccountBalance?: number;
  includeSickLeave: boolean;
  result?: PensionResult;
}

interface SimulationContextProps {
  data: SimulationData | null;
  setData: (data: SimulationData) => void;
}

const SimulationContext = createContext<SimulationContextProps | undefined>(undefined);

export function SimulationProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SimulationData | null>(null);
  return (
    <SimulationContext.Provider value={{ data, setData }}>
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulation() {
  const ctx = useContext(SimulationContext);
  if (!ctx) throw new Error("useSimulation must be used within SimulationProvider");
  return ctx;
}
