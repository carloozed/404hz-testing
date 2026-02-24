import React from 'react';

import styles from './DashboardInfo.module.css';

// types
import { Track } from '@/types/track';

// helpers
import { truncateText } from '@/lib/helpers/truncateText';

type DashboardInfoProps = {
  track: Track;
};

export default function DashboardInfo({ track }: DashboardInfoProps) {
  return (
    <div className={styles.infoContainerDashboard}>
      <div className={styles.title}>
        <h4>{truncateText(track.title, 28)}</h4>
      </div>
      <div className={styles.author}>
        <h4>{truncateText(track.author, 32)}</h4>
      </div>

      <div className={styles.labelcontainer}>
        {track.label && <h5>Label: {truncateText(track.label, 28)}</h5>}
      </div>
    </div>
  );
}
