'use client';
import { useEffect } from 'react';
import { useDaily } from '@daily-co/daily-react';
import { useLocalSessionId } from '@daily-co/daily-react';
import { Video } from './_components/Video';
import { CameraSettings } from './_components/CameraSettings';
import { useParams, useRouter } from 'next/navigation';

const HairCheckScreen = ({ handleJoin, handleEnd }:
  {
    handleJoin: () => void,
    handleEnd: () => void
  }
) => {
  const params = useParams();
  const sessionId = useLocalSessionId();;
  const daily = useDaily();

  useEffect(() => {
    if (daily) {
      daily?.startCamera({ startVideoOff: false, startAudioOff: false });
    }
  }, [daily, sessionId]);

  return <div>
    <Video id={sessionId?.toString() ?? ''} className='max-h-[70vh]' />
    <CameraSettings
      actionLabel='Join Call'
      onAction={handleJoin}
      cancelLabel='Cancel'
      onCancel={handleEnd}
    />
  </div>
};
export default HairCheckScreen;