import React, { useState } from 'react';

import styles from './ConfidenceScore.module.css';

// types
import { PlayerTrack } from '@/types/track';

// helpers
import confidenceScoreColor from '@/lib/helpers/confidenceScore';

type ConfidenceProps = {
  track: PlayerTrack;
};

type ConfidenceColorProps = ConfidenceProps & {};

type ConfidenceTextProps = ConfidenceProps & { isConfidenceHovered: boolean };

export function ConfidenceScoreColor({ track }: ConfidenceColorProps) {
  const [isConfidenceHovered, setIsConfidenceHovered] = useState(false);

  return (
    <div className={styles.confidenceContainer}>
      <div
        className={styles.confidenceScore}
        onMouseEnter={() => setIsConfidenceHovered(true)}
        onMouseLeave={() => setIsConfidenceHovered(false)}
        role="button"
        tabIndex={0}
      >
        <div
          className={styles.confidenceColor}
          style={{
            backgroundColor: `${
              confidenceScoreColor(
                track.recorded_at?.confidence_score ?? track.confidence_score
              ).color
            }`
          }}
        ></div>{' '}
        <ConfidenceText
          track={track}
          isConfidenceHovered={isConfidenceHovered}
        />
      </div>
    </div>
  );
}

export function ConfidenceText({ track }: ConfidenceTextProps) {
  return (
    <div className={styles.confidenceText}>
      <p className={styles.text}>
        {
          confidenceScoreColor(
            track.recorded_at?.confidence_score ?? track.confidence_score
          ).message
        }
      </p>
    </div>
  );
}
