import React, { useState } from 'react';

import styles from './ImageOverlay.module.css';

// types
import { PlayerTrack, Track } from '@/types/track';

// components
import Heart from '@/components/shared/Heart';
import ImageComponent from '@/components/shared/ImageComponent';
import PlayPauseButtonTrack from '@/components/set/PlayPauseButtonTrack';

type ImageOverlayProps = {
  height?: string;
  width?: string;
  track: PlayerTrack | Track;
};

export default function ImageOverlay({
  height,
  width,
  track
}: ImageOverlayProps) {
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [isHovered, setIsHovered] = useState<number | null>(null);

  return (
    <div
      className={styles.albumCover}
      style={{ height: height, width: width }}
      onMouseEnter={() => {
        setIsImageHovered(true);
        setIsHovered(track.id);
      }}
      onMouseLeave={() => {
        setIsImageHovered(false);
        setIsHovered(null);
      }}
    >
      <div className={styles.imageOverlay}>
        <div className={styles.heartContainer}>
          <Heart track={track} isHovered={isImageHovered} />
        </div>
      </div>
      <div style={{ height: height, width: width }}>
        <ImageComponent src={track.album_cover} alt={track.title} />
      </div>
      {track.streaming_links && track.streaming_links.deezer && (
        <PlayPauseButtonTrack track={track} isHovered={isHovered} />
      )}
    </div>
  );
}
