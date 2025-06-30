'use client'
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
    DialogHeader
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from 'sonner';
import { createConversation } from '@/lib';
import { useRouter } from 'next/navigation';
function AddNewAgentDialog() {
  const [agentName, setAgentName] = useState("");
  const [agentDescription, setAgentDescription] = useState("");
  const [agentType, setAgentType] = useState("");
  const [loading,setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    //handleStart();
  })
  const handleStart = async () => {
    try {
      setLoading(true);
      const conversation = await createConversation(agentName,agentDescription);
      setAgentName(conversation.conversation_name);
      setAgentDescription(conversation.conversational_context);
      console.log(conversation)
      router.push(`/meeting/${conversation.conversation_url}`);

    }catch(e){
      toast('something went wrong',{
        description: 'Check console for details'
      })
      console.error(e)
    }finally{
      setLoading(false);
    }
  }
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
          <Button onClick={handleStart}>Create Agent</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewAgentDialog;
