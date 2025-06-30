'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogHeader
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";

import { createConversation } from '@/lib';
import { useAgent } from '@/components/AgentContext';

function AddNewAgentDialog() {
  const { setAgent } = useAgent();
  const [agentName, setAgentName] = useState("");
  const [agentDescription, setAgentDescription] = useState("");
  const [agentType, setAgentType] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleStart = async () => {
    try {
      setLoading(true);

      const conversation = await createConversation(agentName, agentDescription);

      const newAgent = {
        agent_id: conversation.conversation_id,
        agent_name: conversation.conversation_name,
        agent_type: agentType,
        agent_description: conversation.conversational_context,
        agent_url: conversation.conversation_url
      };

      // Store in global context
      setAgent(newAgent);

      // Save to backend
      await fetch('/api/create-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: newAgent.agent_id,
          agent_name: newAgent.agent_name,
          agent_type: newAgent.agent_type,
          agent_description: newAgent.agent_description,
          agent_url: newAgent.agent_url
        })
      });

      // Redirect
      router.push(`/meeting/${newAgent.agent_id}`);
    } catch (error) {
      toast('Something went wrong', { description: 'Check console for details' });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='mt-3'>+ Create New Agent</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Basic Content</DialogTitle>
          <DialogDescription>Create a new AI agent to deliver personalized video experiences.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="agentName">Agent Name</Label>
            <Input
              id="agentName"
              placeholder="e.g., Math Tutor, Health Advisor"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="agentType">Agent Type</Label>
            <Select onValueChange={setAgentType}>
              <SelectTrigger>
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="education">🎓 Education</SelectItem>
                <SelectItem value="healthcare">🩺 Healthcare</SelectItem>
                <SelectItem value="interview">💼 Interview Prep</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of this agent's purpose..."
              value={agentDescription}
              onChange={(e) => setAgentDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleStart} disabled={loading}>
            {loading ? 'Creating...' : 'Create Agent'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewAgentDialog;
