'use client';

import React from 'react';

// components
import SetTrack from './SetTrack';
import DashboardTrack from './DashboardTrack';
import MiniPlayerTrack from './MiniPlayerTrack';

// types
import { TrackVariants } from '@/types/trackVariants';
import { Track } from '@/types/track';

type TrackProps = {
  track: Track;
  index?: number;
  height?: string;
  width?: string;
  variant: TrackVariants;
  selectedSet?: number | null;
  containerHeight?: string;
};

export default function TrackComponent({
  track,
  index,
  height,
  width,
  variant,
  containerHeight
}: TrackProps) {
  const trackProps = {
    index: index,
    track: track,
    height: height,
    width: width,
    variant
  };

  return variant === 'dashboard' ? (
    <DashboardTrack {...trackProps} containerHeight={containerHeight} />
  ) : variant === 'settrack' ? (
    <SetTrack {...trackProps} />
  ) : variant === 'miniplayer' ? (
    <MiniPlayerTrack {...trackProps} />
  ) : null;
}
