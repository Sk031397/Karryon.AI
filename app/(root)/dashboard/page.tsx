'use client';
import AddNewAgentDialog from "./_components/AddNewAgentDialog";
import HistoryList from "./_components/HistoryList";
import AgentsList from "./_components/AgentsList";
import useSWR from 'swr';
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function DashboardPage() {
  const user = useUser();
  useEffect(() => {
    AddNewUser();
  },[user]);

  const AddNewUser = async () => {
    if(user){
      await fetch('/api/create-user',{method:'POST'})
    }
  }
  return (
    <>
      <div className="flex items-center justify-between">
        {user.isSignedIn ? (
          <h2 className="font-bold text-2xl italic">{user.user?.fullName}'s Dashboard</h2>
        ):(
          <h2 className="font-bold text-2xl">Dashboard</h2>
        )}
        <AddNewAgentDialog/>
      </div>
      <HistoryList/>
      <AgentsList/>
    </>
  )
}
