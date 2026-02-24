import React from 'react';

import styles from './HoveredTrack.module.css';

// types
import { Track } from '@/types/track';

// helpers
import { truncateText } from '@/lib/helpers/truncateText';

type HoveredTrackProps = {
  hoveredTrack: Track | null;
};

export default function HoveredTrack({ hoveredTrack }: HoveredTrackProps) {
  return (
    <>
      {hoveredTrack && (
        <div className={styles.hoveredTrackInfo}>
          <span className={styles.author}>
            {truncateText(hoveredTrack.author, 18)}
          </span>
          <span>-</span>
          <span>{truncateText(hoveredTrack.title, 18)}</span>
        </div>
      )}
    </>
  );
}
