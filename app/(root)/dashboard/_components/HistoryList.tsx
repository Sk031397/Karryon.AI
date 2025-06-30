'use client';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import AddNewAgentDialog from "./AddNewAgentDialog";
type InterviewHistory = {
  id: string;
  title: string;
  recipient: string;
  date: string;
  videoUrl: string;
};

const dummyInterviews: InterviewHistory[] = [
  {
    id: "int-001",
    title: "Mock UX Interview",
    recipient: "Ethan Zhao",
    date: "2025-06-20",
    videoUrl: "https://cdn.tavus.ai/videos/cvi-010.mp4",
  },
  {
    id: "int-002",
    title: "Product Manager Behavioral Round",
    recipient: "Liam Tran",
    date: "2025-06-14",
    videoUrl: "https://cdn.tavus.ai/videos/cvi-004.mp4",
  },
  {
    id: "int-003",
    title: "Technical Interview – AI Role",
    recipient: "Sahid Kebe",
    date: "2025-06-01",
    videoUrl: "https://cdn.tavus.ai/videos/cvi-011.mp4",
  },
];

const HistoryList = () => {
  const [historyList, setHistoryList] = React.useState<InterviewHistory[]>(dummyInterviews);

  return (
    <div className="mt-10">
      {historyList.length === 0 ? (
        <div className="flex items-center justify-center flex-col p-7 border-dashed rounded-2xl border-2">
          <img src={"/logo.png"} alt="empty" width={200} height={200} />
          <h2 className="font-bold text-xl mt-2">No Recent Agents</h2>
          <AddNewAgentDialog />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {historyList.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm dark:bg-neutral-900 dark:border-neutral-800"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="/avatar-placeholder.png" // Swap this with dynamic profile or agent image if available
                  alt="Agent avatar"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-lg text-neutral-800 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Interview with {item.recipient}
                  </p>
                  <p className="text-xs text-neutral-400 mt-1">{item.date}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <a
                  href={item.videoUrl}
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
