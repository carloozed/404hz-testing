'use client';

import React, { useState, useEffect, useRef } from 'react';

import styles from './MiniPlayer.module.css';

//types
import { Set } from '@/types/set';

// components
import SetComponent from '@/components/set/SetComponent';
import MiniPlayerTrack from '@/components/track/MiniPlayerTrack';

// stores
import { useMiniplayerStore } from '@/stores/useMiniplayerStore';
import { usePlayerStore } from '@/stores/PlayerStore';
import { useTrackPlayerStore } from '@/stores/TrackPlayerStore';

// helpers
import formatMilliseconds from '@/lib/helpers/formatMiliseconds';

export default function MiniPlayer() {
  const [playerIsHidden, setPlayerIsHidden] = useState(false);
  const draggableTarget = useRef<HTMLDivElement | null>(null);
  const [firstShowPlayer, setFirstShowPlayer] = useState(false);
  const {
    mixIsPlaying,
    isPlaying: setPlayerIsPlaying,
    mixURL,
    mixTitle,
    mixThumbnail,
    mixAuthor,
    mixGenre,
    mixSource,
    duration
  } = usePlayerStore();
  const { isPlaying: trackIsPlaying, track } = useTrackPlayerStore();

  const [isPlaying, setIsPlaying] = useState(false);

  const { setIsMiniplayerOpen, showMiniplayerTrack } = useMiniplayerStore();

  const setProp: Set = {
    id: mixIsPlaying as number,
    author: mixAuthor,
    url: mixURL,
    thumbnail: mixThumbnail,
    title: mixTitle,
    genre: mixGenre,
    duration: formatMilliseconds(duration),
    source: mixSource
  };

  useEffect(() => {
    setIsPlaying(trackIsPlaying || setPlayerIsPlaying);
    if (trackIsPlaying || setPlayerIsPlaying) {
      setFirstShowPlayer(true);
    }
  }, [trackIsPlaying, setPlayerIsPlaying]);

  useEffect(() => {
    setIsMiniplayerOpen(isPlaying || trackIsPlaying);
  }, [setIsMiniplayerOpen, isPlaying, trackIsPlaying]);

  return (
    <div
      className={`${styles.outer} ${!firstShowPlayer ? styles.playerHidden : ''}`}
      ref={draggableTarget}
    >
      <div
        className={styles.hide}
        onClick={() => setPlayerIsHidden(!playerIsHidden)}
      >
        <p>{playerIsHidden ? '←' : '→'}</p>
      </div>
      <div
        className={`${styles.wrapper} ${playerIsHidden ? styles.hidden : ''}`}
      >
        <div className={styles.container}>
          {setProp && (
            <SetComponent
              showIndicator={false}
              waveformWidth={'100%'}
              {...setProp}
              textTruncated={true}
              isMiniplayer={true}
              variant={'miniplayer'}
            />
          )}

          {track && (
            <div
              className={`${styles.previewTrackContainer} ${!showMiniplayerTrack ? styles.trackhidden : ''}`}
            >
              <MiniPlayerTrack track={track} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
