'use client';
import { useEffect, useState } from 'react';
import { useDaily, useLocalSessionId } from '@daily-co/daily-react';
import { useParams, useRouter } from 'next/navigation';
import { createSupabaseServer } from '@/lib/server';

import { Video } from './_components/Video';
import CameraSettingsComponent from './_components/CameraSettings';
import { Button } from '@/components/ui/button';

const JoinCallScreen = () => {
  const localSessionId = useLocalSessionId();
  const daily = useDaily();
  const params = useParams();
  const client = createSupabaseServer();
  const router = useRouter();

  const [meetingUrl, setMeetingUrl] = useState<string>('');
  const [isInCall, setIsInCall] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);

  // Start camera preview
  useEffect(() => {
    if (daily) {
      daily.startCamera({ startVideoOff: false, startAudioOff: false });
    }
  }, [daily, localSessionId]);

  // Fetch meeting URL from Supabase
  useEffect(() => {
    async function fetchMeetingUrl() {
      const id = params.meetingId;
      const { data } = await client
        .from('agents')
        .select('agent_url')
        .eq('id', id)
        .single();

      if (data?.agent_url) {
        setMeetingUrl(data.agent_url);
      }
    }
    fetchMeetingUrl();
  }, [params.meetingId, client]);

  const handleJoinCall = async () => {
    if (daily && meetingUrl) {
      await daily.join({ url: meetingUrl });
      setIsInCall(true);
    }
  };

  const handleLeaveCall = async () => {
    if (daily) {
      await daily.leave();
      setIsInCall(false);
      router.push('/');
    }
  };

  const toggleMic = () => {
    if (daily) {
      daily.setLocalAudio(!isMicOn);
      setIsMicOn(prev => !prev);
    }
  };

  const toggleCamera = () => {
    if (daily) {
      daily.setLocalVideo(!isCameraOn);
      setIsCameraOn(prev => !prev);
    }
  };

return (
  <div className="min-h-screen flex items-center justify-center border border-solid border-gray-400 rounded-xl">
    <div className="rounded-xl p-4 w-full max-w-2xl space-y-4">
      <Video id={localSessionId} className="w-full max-h-[60vh]" />

      <div className="flex justify-center items-center space-x-4 mt-4">
        <Button onClick={handleJoinCall}>Join Call</Button>
        <Button onClick={toggleMic}>{isMicOn ? 'Mute Mic' : 'Unmute Mic'}</Button>
        <Button onClick={toggleCamera}>{isCameraOn ? 'Turn Off Camera' : 'Turn On Camera'}</Button>
      </div>
    </div>
  </div>
  );
};

export default JoinCallScreen;
