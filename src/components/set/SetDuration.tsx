'use client';

import React from 'react';

import styles from './SetDuration.module.css';

// types
import { Set } from '@/types/set';
import { SetVariants } from '@/types/setVariants';

//stores
import { usePlayerStore } from '@/stores/PlayerStore';

//helpers
import formatMilliseconds from '@/lib/helpers/formatMiliseconds';

type SetDurationProps = {
  set: Set;
  variant: SetVariants;
};

export default function SetDuration({ set, variant }: SetDurationProps) {
  const { currentPosition, mixIsPlaying } = usePlayerStore();

  const isPlaying = mixIsPlaying === set.id;
  const elapsedTime = isPlaying
    ? formatMilliseconds(currentPosition)
    : '00:00:00';

  return (
    <div className={`${styles.setduration} ${styles[variant]}`}>
      <p>{elapsedTime}</p>
      {variant !== 'miniplayer' && <p>/</p>}
      {variant !== 'miniplayer' && <p>{set && set.duration}</p>}
    </div>
  );
}
