import { Dispatch, SetStateAction } from 'react';

// types
import { PlayerTrack } from '@/types/track';

export const copyArtistTrackname = (
  track: PlayerTrack,
  setIsCopied: Dispatch<SetStateAction<boolean>>
) => {
  navigator.clipboard.writeText(`${track.author} - ${track.title}`);
  setIsCopied(true);
};
