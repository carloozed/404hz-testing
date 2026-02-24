import { useCallback } from 'react';

import { PlayerTrack, Track } from '@/types/track';

import { usePlayerStore } from '@/stores/PlayerStore';
import { useTrackPlayerStore } from '@/stores/TrackPlayerStore';

export const useHandleTimestampClick = () => {
  const {
    requestSeek,
    setIsPlaying: setMixIsPlayingState,
    isPlaying: isMixPlaying,
    setMixIsPlaying,
    mixIsPlaying,
    setMixURL
  } = usePlayerStore();

  const { isPlaying: isTrackPlaying, setIsPlaying: setTrackIsPlaying } =
    useTrackPlayerStore();

  const handleTimestampClick = useCallback(
    (trackPosition: number, track: Track | PlayerTrack) => {
      const setAssociation = track.set_associations?.[0];
      if (!setAssociation?.set) return;

      // Stop track player if it's playing
      if (isTrackPlaying) {
        setTrackIsPlaying(false);
      }

      if (
        !isMixPlaying &&
        trackPosition !== undefined &&
        mixIsPlaying === null
      ) {
        // No mix playing yet - start the mix
        setMixURL(setAssociation.set.url);
        setMixIsPlaying(setAssociation.set.id);
        setTimeout(() => requestSeek(trackPosition), 400);
        setMixIsPlayingState(true);
      } else if (mixIsPlaying === setAssociation.set.id) {
        // Same mix - just seek to position
        requestSeek(trackPosition);
        if (!isMixPlaying) {
          setMixIsPlayingState(true);
        }
      } else {
        // Different mix - switch to it
        setMixURL(setAssociation.set.url);
        setMixIsPlaying(setAssociation.set.id);
        setTimeout(() => requestSeek(trackPosition), 400);
        setMixIsPlayingState(true);
      }
    },
    [
      isMixPlaying,
      isTrackPlaying,
      requestSeek,
      setMixIsPlaying,
      setMixIsPlayingState,
      setTrackIsPlaying,
      mixIsPlaying,
      setMixURL
    ]
  );

  return { handleTimestampClick };
};
