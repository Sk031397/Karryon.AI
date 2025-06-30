'use client'
import { Button } from '@/components/ui/button';
import { IAgents } from '@/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function AgentsList() {
  const [availableAgents,setAvaliableAgents] = useState<IAgents[]>([]);
  useEffect(() => {
    GetAvaliableAgents();
  },[]);
  const GetAvaliableAgents = async () => {
    const response = await fetch('/api/get-agentlist',{ method:"GET"})
    const data = await response.json();
    console.log("Agent list:", data);
    setAvaliableAgents(data.agents);
  }
  return (
    <div className="mt-10">
      <h2 className="font-bold text-xl mb-4">AI Specialized Agents</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {availableAgents.map((agent,index) => (
          <div
            key={index}
            className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm overflow-hidden"
          >
            <div className="relative">
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg text-neutral-800 dark:text-white">
                {agent.agent_name}
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                {agent.agent_description}
              </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 uppercase italic">
                {agent.agent_type}
              </p>
              <a
                href={agent.agent_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="mt-3 w-full">Watch Agent</Button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
