import React, { useState } from 'react';

import styles from './TracknameContainer.module.css';

// prismic components
import { PrismicNextImage } from '@prismicio/next';

// types
import { PlayerTrack } from '@/types/track';

// helpers
import { truncateText } from '@/lib/helpers/truncateText';
import { copyArtistTrackname } from '@/lib/helpers/copyHelpers/copyArtistTrack';

// stores
import { useTrackPlayerStore } from '@/stores/TrackPlayerStore';

// context
import { useIcons } from '@/providers/IconContext';

type TracknameContainerProps = {
  track: PlayerTrack;
};

export default function TracknameContainer({ track }: TracknameContainerProps) {
  const [isCopied, setIsCopied] = useState(false);
  const { copy } = useIcons();

  const { track: storeTrack } = useTrackPlayerStore();

  return (
    <div className={styles.title}>
      <h4>{truncateText(storeTrack?.title as string, 20)}</h4>
      <div
        className={`${styles.copycontainer} ${isCopied ? styles.copied : ''}`}
        onClick={() => copyArtistTrackname(track, setIsCopied)}
        onMouseLeave={() => isCopied === true && setIsCopied(false)}
      >
        <PrismicNextImage field={copy?.data.icon} />
      </div>
    </div>
  );
}
