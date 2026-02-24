'use client';

import React from 'react';

import styles from './DashboardTrack.module.css';

// components
import Buylinks from './Buylinks';
import ImageOverlay from './ImageOverlay';
import DashboardInfo from './DashboardInfo';

// types
import { TrackVariants } from '@/types/trackVariants';
import { Track } from '@/types/track';

type DashboardTrackProps = {
  index?: number;
  track: Track;
  height?: string;
  width?: string;
  variant?: TrackVariants;
  containerHeight?: string;
};

export default function DashboardTrack({
  track,
  index,
  height = '11rem',
  width = '11rem',
  containerHeight
}: DashboardTrackProps) {
  return (
    <div
      key={index}
      className={styles.track}
      style={{ height: containerHeight ? containerHeight : 'fit-content' }}
    >
      <ImageOverlay track={track} height={height} width={width} />
      <div className={styles.trackDetails}>
        <DashboardInfo track={track} />
        <div className={styles.lowerContainer}>
          <Buylinks track={track} variant="dashboard" />
        </div>
      </div>
    </div>
  );
}
