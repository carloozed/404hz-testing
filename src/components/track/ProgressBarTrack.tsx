import React from 'react';

import styles from './ProgressBarTrack.module.css';

// types
import { PlayerTrack } from '@/types/track';

// stores
import { useTrackPlayerStore } from '@/stores/TrackPlayerStore';

// helpers
import { formatSecondsToMinSec } from '@/lib/helpers/formatSecondsToMinSec';

type ProgressBarTrackProps = {
  track: PlayerTrack;
};

export default function ProgressBarTrack({ track }: ProgressBarTrackProps) {
  const { duration, currentPosition, requestSeek } = useTrackPlayerStore();

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const seekPosition = percentage * duration;
    requestSeek(seekPosition);
  };

  return (
    <>
      {track.streaming_links.deezer ? (
        <div className={styles.container}>
          <div className={styles.timecontainer}>
            <p>{formatSecondsToMinSec(currentPosition)}</p>
            <p>/</p>
            <p>{formatSecondsToMinSec(duration)}</p>
          </div>
          <div className={styles.progressbarContainer} onClick={handleSeek}>
            <div
              className={styles.seekerContainer}
              style={{ width: `${(100 / duration) * currentPosition}%` }}
            ></div>
          </div>
        </div>
      ) : (
        <div className={styles.noPreview}>
          <p>No Preview available</p>
        </div>
      )}
    </>
  );
}
