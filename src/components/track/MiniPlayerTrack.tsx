'use client';

import React from 'react';

import styles from './MiniPlayerTrack.module.css';

// components
import ImageOverlay from './ImageOverlay';
import MiniplayerInfo from './MiniplayerInfo';
import CloseTrackpreview from './CloseTrackpreview';
import ProgressBarTrack from './ProgressBarTrack';

// types
import { PlayerTrack } from '@/types/track';
import { TrackVariants } from '@/types/trackVariants';

type MiniPlayerTrack = {
  track: PlayerTrack;
  height?: string;
  width?: string;
  variant?: TrackVariants;
};

export default function MiniPlayerTrack({ track }: MiniPlayerTrack) {
  return (
    <div className={styles.track}>
      <ImageOverlay height={'4rem'} width={'4rem'} track={track} />
      <MiniplayerInfo hasBorder={true} track={track} variant="miniplayer" />
      <div className={styles.test}>
        <ProgressBarTrack track={track} />
        <CloseTrackpreview />
      </div>
    </div>
  );
}
