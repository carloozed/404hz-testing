import React, { useState } from 'react';

import styles from './SetName.module.css';

//components
import CopyContainer from './CopyContainer';
import IsBeingPlayedIndicator from '@/components/player/IsBeingPlayedIndicator';

// stores
import { usePlayerStore } from '@/stores/PlayerStore';

// types
import { Set } from '@/types/set';
import { SetVariants } from '@/types/setVariants';

// helpers
import { truncateText } from '@/lib/helpers/truncateText';

type SetNameProps = {
  set: Set;
  textTruncated: boolean;
  variant: SetVariants;
};

export default function SetName({ set, textTruncated, variant }: SetNameProps) {
  const [isCopied, setIsCopied] = useState(false);

  const { mixIsPlaying } = usePlayerStore();

  const isShifted =
    variant === 'miniplayer' ||
    variant === 'default' ||
    mixIsPlaying === set.id;

  const CopyContainerProps = {
    isCopied: isCopied,
    setIsCopied: setIsCopied,
    set: set,
    variant: variant
  };

  return (
    <div className={`${styles.upperContainer} ${styles[variant]}`}>
      <div className={`${styles.titleContainer} `}>
        {isShifted && <IsBeingPlayedIndicator set={set} variant={variant} />}
        <div
          className={`${styles.title} ${mixIsPlaying === set.id && isShifted ? styles.shifted : ''}`}
        >
          {textTruncated ? (
            <div className={`${styles.cont} ${styles[variant]}`}>
              <h4>{truncateText(set.title, 32)}</h4>
              <CopyContainer {...CopyContainerProps} />
            </div>
          ) : (
            <h4>{set.title}</h4>
          )}
        </div>
        {variant !== 'miniplayer' && set.genre && (
          <div
            className={`${styles.tagContainer} ${mixIsPlaying === set.id ? styles.shifted : ''}`}
          >
            <h6>{set.genre}</h6>
          </div>
        )}
      </div>
      {variant !== 'miniplayer' && (
        <div className={styles.channelContainer}>
          <h6>{set && set.author}</h6>
        </div>
      )}
    </div>
  );
}
