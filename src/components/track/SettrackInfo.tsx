import React from 'react';

import styles from './SettrackInfo.module.css';

// components
import { ConfidenceScoreColor } from './ConfidenceScore';
import RecordedAt from './RecordedAt';

// types
import { Track } from '@/types/track';

// helpers
import { truncateText } from '@/lib/helpers/truncateText';
type SettrackInfoProps = { track: Track };

export default function SettrackInfo({ track }: SettrackInfoProps) {
  return (
    <div className={styles.infoContainerScanning}>
      <div className={styles.title}>
        <h4>{truncateText(track.title, 20)}</h4>
      </div>
      <div className={styles.author}>
        <h4>{track.author}</h4>
      </div>

      <RecordedAt track={track} variant="settrack" />
      <div className={styles.confidenceScore}>
        <ConfidenceScoreColor track={track} />
      </div>
    </div>
  );
}
