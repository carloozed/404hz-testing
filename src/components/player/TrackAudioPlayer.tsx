'use client';

import React, { useEffect, useRef } from 'react';

// stores
import { useTrackPlayerStore } from '@/stores/TrackPlayerStore';

export default function TrackAudioPlayer() {
  const playerRef = useRef<HTMLAudioElement>(null);
  const {
    audioUrl,
    isPlaying,
    setIsPlaying,
    setCurrentPosition,
    setDuration,
    seekToPosition,
    clearSeekRequest
  } = useTrackPlayerStore();

  // Handle audio URL changes
  useEffect(() => {
    if (playerRef.current && audioUrl) {
      playerRef.current.load();
      playerRef.current.play().catch(console.error);
    }
  }, [audioUrl]);

  // Handle play/pause state
  useEffect(() => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.play().catch(console.error);
    } else {
      playerRef.current.pause();
    }
  }, [isPlaying]);

  // Handle seek requests
  useEffect(() => {
    if (playerRef.current && seekToPosition !== null) {
      playerRef.current.currentTime = seekToPosition;
      clearSeekRequest();
    }
  }, [seekToPosition, clearSeekRequest]);

  const handleTimeUpdate = () => {
    if (playerRef.current) {
      setCurrentPosition(playerRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (playerRef.current) {
      setDuration(playerRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentPosition(0);
  };

  return (
    <div
      style={{
        position: 'absolute',
        width: 1,
        height: 1,
        opacity: 0,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    >
      <audio
        ref={playerRef}
        src={audioUrl || undefined}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />
    </div>
  );
}
