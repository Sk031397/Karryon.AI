'use client';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AddNewAgentDialog from "./AddNewAgentDialog";
import { IAgents } from "@/types";


const HistoryList = () => {
  useEffect(() => {
    GetListAgents();
  },[]);
  const GetListAgents = async () => {
    const response = await fetch('/api/get-agentlist',{ method:"GET"})
    const data = await response.json();
    setHistoryList(data.agents);
  }
  const [historyList, setHistoryList] = useState<IAgents[]>([]);

  return (
    <div className="mt-10">
      {!historyList ? (
        <div className="flex items-center justify-center flex-col p-7 border-dashed rounded-2xl border-2">
          <Image src={"/logo.png"} alt="empty" width={200} height={200} />
          <h2 className="font-bold text-xl mt-2">No Recent Agents</h2>
          <AddNewAgentDialog />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {historyList.map((item,index) => (
            <div
              key={index}
              className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm dark:bg-neutral-900 dark:border-neutral-800"
            >
              <div className="flex items-center gap-4 mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-neutral-800 dark:text-white">
                    {item.agent_name}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    {item.agent_description}
                  </p>
                  
                </div>
              </div>
              <div className="flex gap-3">
                <a
                  href={item.agent_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button>Watch</Button>
                </a>
                <Button variant="outline">Review</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryList;
