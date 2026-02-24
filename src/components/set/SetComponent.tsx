'use client';

import React, { useState } from 'react';
import styles from './SetComponent.module.css';

// types
import { Set } from '@/types/set';
import { SetVariants } from '@/types/setVariants';

// store
import { usePlayerStore } from '@/stores/PlayerStore';
import { useMiniplayerStore } from '@/stores/useMiniplayerStore';

// component
import SetName from './SetName';
import Waveform from './Waveform';
import Indicator from './Indicator';
import ImageComponent from '@/components/shared/ImageComponent';
import SourceLogo from './SourceLogo';
import PlayPauseButton from './PlayPauseButton';
import HoveredTrack from './HoveredTrack';

type SetProps = Set & {
  showIndicator?: boolean;
  showWaveform?: boolean;
  onClick?: () => void;
  setOpen?: number | null;
  index?: number;
  waveformWidth?: string;
  textTruncated?: boolean;
  isMiniplayer?: boolean;
  isDashboardPlayer?: boolean;
  variant: SetVariants;
};

export default function SetComponent({
  showIndicator = true,
  showWaveform = true,
  onClick,
  setOpen,
  index,
  waveformWidth = '50rem',
  textTruncated = false,
  isMiniplayer = false,
  variant,
  ...set
}: SetProps) {
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const { mixIsPlaying } = usePlayerStore();
  const { hoveredTrack } = useMiniplayerStore();

  const showHoveredTrack = false;

  return (
    <div
      className={`${styles.container} ${styles[variant]} ${mixIsPlaying === set.id ? styles.mixIsPlaying : ''}`}
    >
      {' '}
      <div className={styles.leftContainer}>
        <div
          className={styles.setImageContainer}
          onMouseEnter={() => setIsHovered(set.id)}
          onMouseLeave={() => setIsHovered(null)}
        >
          <PlayPauseButton set={set} isHovered={isHovered} />
          <ImageComponent src={set.thumbnail} alt={set.title} />
        </div>
        <div className={styles.infoContainer}>
          <SetName set={set} textTruncated={textTruncated} variant={variant} />
          {showWaveform && (
            <Waveform
              set={set}
              width={waveformWidth}
              isMiniplayer={isMiniplayer}
              variant={variant}
            />
          )}
          <div className={styles.lowercontainer}>
            {variant !== 'miniplayer' && <SourceLogo set={set} />}
            {showHoveredTrack && <HoveredTrack hoveredTrack={hoveredTrack} />}
          </div>
        </div>
      </div>
      {showIndicator && (
        <Indicator setOpen={setOpen} index={index} onClick={onClick} />
      )}
    </div>
  );
}
