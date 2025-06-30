'use client';
import { IAgents } from '@/types';
import { createContext, useContext, useState, ReactNode } from 'react';


type AgentContextType = {
  agent: IAgents | null;
  setAgent: (agent: IAgents) => void;
};

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export const AgentProvider = ({ children }: { children: ReactNode }) => {
  const [agent, setAgent] = useState<IAgents | null>(null);

  return (
    <AgentContext.Provider value={{ agent, setAgent }}>
      {children}
    </AgentContext.Provider>
  );
};

export const useAgent = () => {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error('useAgent must be used within an AgentProvider');
  }
  return context;
};
