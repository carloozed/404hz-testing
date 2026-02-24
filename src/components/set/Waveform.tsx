import React, { useMemo, useEffect, useState } from 'react';

import styles from './Waveform.module.css';

// components
import Trackneedles from './Trackneedles';
import SetDuration from './SetDuration';

// stores
import { useAnalyzeStore } from '@/stores/UseAnalyzeStore';
import { usePlayerStore } from '@/stores/PlayerStore';

// types
import { SetVariants } from '@/types/setVariants';
import { Set } from '@/types/set';

// helpers
import { convertStringTimeIntoMiliseconds } from '@/lib/helpers/convertStringTimeIntoMiliseconds';

type WaveformProps = {
  set: Set;
  width?: string;
  isMiniplayer: boolean;
  columns?: number;
  variant: SetVariants;
};

export default function Waveform({
  set,
  width,
  isMiniplayer = false,
  variant
}: WaveformProps) {
  const {
    mixIsPlaying,
    currentPosition,
    requestSeek,
    setIsPlaying,
    isPlaying
  } = usePlayerStore();
  const convertedTime = convertStringTimeIntoMiliseconds(
    set.duration && set.duration
  );

  const [showImages, setShowImages] = useState(false);
  const { response: analyzeResponse, isAnalyzing } = useAnalyzeStore();

  const bars = useMemo(() => {
    return Array.from(
      { length: variant === 'miniplayer' ? 200 : 300 },
      (_, index) => ({
        key: index,
        height:
          variant === 'miniplayer'
            ? ((index * 1337) % 80) + 15
            : ((index * 1337) % 80) + 20
      })
    );
  }, [variant]);

  const handleWaveformClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mixIsPlaying !== set.id) return;

    const waveformElement = e.currentTarget;
    const rect = waveformElement.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newPosition = Math.floor(percentage * convertedTime);

    requestSeek(newPosition);
    if (!isPlaying) {
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (
      isMiniplayer ||
      mixIsPlaying === set.id ||
      mixIsPlaying === analyzeResponse?.id ||
      (isAnalyzing && analyzeResponse?.id === set.id)
    ) {
      setShowImages(true);
    } else {
      setShowImages(false);
    }
  }, [mixIsPlaying, set.id, analyzeResponse, isMiniplayer, isAnalyzing]);

  return (
    <div className={`${styles.waveformContainer} ${styles[variant]}`}>
      <SetDuration set={set} variant={variant} />
      <div
        className={styles.seekerContainer}
        style={{
          width: `${mixIsPlaying === set.id ? (100 / convertedTime) * currentPosition : 0}%`
        }}
      >
        <div className={styles.seeker}>
          <div className={styles.seekerEnd}>
            <div className={styles.seekerCircle}></div>
          </div>
        </div>
      </div>
      <div
        className={styles.waveform}
        style={{
          width: width,
          cursor: mixIsPlaying === set.id ? 'pointer' : 'default'
        }}
        onClick={handleWaveformClick}
      >
        {bars.map((bar) => (
          <div
            key={bar.key}
            className={styles.progressBarElement}
            style={{ height: `${bar.height}%` }}
          ></div>
        ))}
      </div>
      {showImages && (
        <Trackneedles
          set={set}
          convertedTime={convertedTime}
          variant={variant}
        />
      )}
    </div>
  );
}
