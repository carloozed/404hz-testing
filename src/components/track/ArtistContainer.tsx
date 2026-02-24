import React, { useState } from 'react';

import styles from './ArtistContainer.module.css';

// types
import { PlayerTrack } from '@/types/track';

// helpers
import { truncateText } from '@/lib/helpers/truncateText';

type ArtistContainerProps = {
  track: PlayerTrack;
};

export default function ArtistContainer({ track }: ArtistContainerProps) {
  const [isAuthorHovered, setIsAuthorHovered] = useState(false);

  return (
    <div
      className={`${styles.author} ${isAuthorHovered && styles.slider}`}
      onMouseEnter={() => track.author.length >= 27 && setIsAuthorHovered(true)}
      onMouseLeave={() =>
        track.author.length >= 27 && setIsAuthorHovered(false)
      }
    >
      {!isAuthorHovered ? (
        <h4>{truncateText(track.author, 27)}</h4>
      ) : (
        <h4> {track.author}</h4>
      )}
    </div>
  );
}
