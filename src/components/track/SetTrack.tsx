'use client';

import React, { useEffect, useState } from 'react';

import styles from './SetTrack.module.css';

// components
import Buylinks from './Buylinks';
import ImageOverlay from './ImageOverlay';
import SettrackInfo from './SettrackInfo';
import IsBeingPlayedIndicator from '@/components/player/IsBeingPlayedIndicator';

// types
import { Track } from '@/types/track';
import { TrackVariants } from '@/types/trackVariants';

// stores
import { useMiniplayerStore } from '@/stores/useMiniplayerStore';
import { usePlayerStore } from '@/stores/PlayerStore';

// helpers
import { convertStringTimeIntoMiliseconds } from '@/lib/helpers/convertStringTimeIntoMiliseconds';

type SetTrackProps = {
  index?: number;
  track: Track;
  height?: string;
  width?: string;
  variant: TrackVariants;
};

export default function SetTrack({
  track,
  index,
  variant = 'settrack'
}: SetTrackProps) {
  const [isHighlighted, setIsHighlighted] = useState<boolean>(false);
  const { hoveredTrack } = useMiniplayerStore();
  const { currentPosition } = usePlayerStore();

  useEffect(() => {
    const start = convertStringTimeIntoMiliseconds(
      track.recorded_at.begin_time_offset
    );
    const end = start + 60000;

    if (currentPosition >= start && currentPosition < end) {
      setIsHighlighted(true);
    } else {
      setIsHighlighted(false);
    }
  }, [currentPosition, track, hoveredTrack]);

  return (
    <div key={index} className={`${styles.track}`}>
      {isHighlighted && <IsBeingPlayedIndicator track={track} />}

      <div
        className={`${styles.trackImageContainer} ${isHighlighted ? styles.highlighted : ''}  ${hoveredTrack?.id === track.id ? styles.hovered : ''}`}
      >
        <ImageOverlay height={'100%'} width={'100%'} track={track} />
      </div>
      <div className={styles.trackDetails}>
        <SettrackInfo track={track} />
        <div className={styles.lowerContainer}>
          <Buylinks track={track} variant={variant} />
        </div>
      </div>
    </div>
  );
}
