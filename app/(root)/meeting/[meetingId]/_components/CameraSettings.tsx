// CameraSettingsComponent.tsx
'use client';
import React, { useCallback, useState } from 'react';
import { 
  Video, VideoOff, Mic, MicOff, Phone, PhoneOff
} from 'lucide-react';
import { useDaily, useDevices, useLocalSessionId, useVideoTrack, useAudioTrack, useDailyEvent } from '@daily-co/daily-react';

export default function CameraSettingsComponent({
  isInCall,
  handleJoinCall,
  handleLeaveCall
}: {
  isInCall: boolean;
  handleJoinCall: () => void;
  handleLeaveCall: () => void;
}) {
  const daily = useDaily();
  const {
    currentCam,
    currentMic,
    currentSpeaker,
    microphones,
    speakers,
    cameras,
    setMicrophone,
    setCamera,
    setSpeaker,
    refreshDevices,
  } = useDevices();

  const localSessionId = useLocalSessionId();
  const localVideo = useVideoTrack(localSessionId);
  const localAudio = useAudioTrack(localSessionId);
  const isCameraEnabled = !localVideo.isOff;
  const isMicEnabled = !localAudio.isOff;

  const [getUserMediaError, setGetUserMediaError] = useState(false);

  useDailyEvent(
    'camera-error',
    useCallback(() => {
      setGetUserMediaError(true);
    }, [])
  );

  const toggleCamera = () => {
    daily?.setLocalVideo(!isCameraEnabled);
  };

  const toggleMicrophone = () => {
    daily?.setLocalAudio(!isMicEnabled);
  };

  return (
    <div className="text-white p-3 rounded-b-xl">
      {/* Main Controls */}
      <div className="flex justify-center items-center space-x-3 mb-3">
        {/* Microphone Toggle */}
        <button
          onClick={toggleMicrophone}
          className={`p-3 rounded-full transition-all duration-200 hover:scale-105 ${
            isMicEnabled 
              ? 'bg-gray-700 hover:bg-gray-600' 
              : 'bg-red-500 hover:bg-red-600'
          }`}
          title={isMicEnabled ? 'Mute microphone' : 'Unmute microphone'}
        >
          {isMicEnabled ? <Mic size={18} /> : <MicOff size={18} />}
        </button>

        {/* Camera Toggle */}
        <button
          onClick={toggleCamera}
          className={`p-3 rounded-full transition-all duration-200 hover:scale-105 ${
            isCameraEnabled 
              ? 'bg-gray-700 hover:bg-gray-600' 
              : 'bg-red-500 hover:bg-red-600'
          }`}
          title={isCameraEnabled ? 'Turn off camera' : 'Turn on camera'}
        >
          {isCameraEnabled ? <Video size={18} /> : <VideoOff size={18} />}
        </button>

        {/* Call Control */}
        <button
          onClick={isInCall ? handleLeaveCall : handleJoinCall}
          className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 flex items-center space-x-2 ${
            isInCall
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {isInCall ? (
            <>
              <PhoneOff size={16} />
              <span className="text-sm">End</span>
            </>
          ) : (
            <>
              <Phone size={16} />
              <span className="text-sm">Join</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
