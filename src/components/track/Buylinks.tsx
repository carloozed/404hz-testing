import React from 'react';

import styles from './Buylinks.module.css';

// types
import { PlayerTrack, Track } from '@/types/track';
import { TrackVariants } from '@/types/trackVariants';

// prismic components
import { PrismicNextImage } from '@prismicio/next';

// context
import { useIcons } from '@/providers/IconContext';

// varia
import Link from 'next/link';

type Props = {
  track: PlayerTrack | Track | null;
  variant: TrackVariants;
};

export default function Buylinks({ track, variant }: Props) {
  const { deezer, beatport, youtube, apple, discogs, bandcamp } = useIcons(); // import spotify as well

  if (!track) return;

  return (
    <>
      {track.streaming_links && (
        <div
          className={`${styles.buylinks} ${styles[variant]} ${variant === 'dashboard' && styles.dashboard} ${variant === 'settrack' && styles.scanning}`}
        >
          {/* {track.streaming_links.spotify && (
            <Link href={track.streaming_links.spotify} target="_blank">
              <PrismicNextImage field={spotify?.data.icon} />
            </Link>
          )} */}
          {track.streaming_links.bandcamp && (
            <Link href={track.streaming_links.bandcamp} target="_blank">
              <PrismicNextImage field={bandcamp?.data.icon} />
            </Link>
          )}

          {track.streaming_links.deezer && (
            <Link href={track.streaming_links.deezer} target="_blank">
              <PrismicNextImage field={deezer?.data.icon} />
            </Link>
          )}
          {track.streaming_links.beatport && (
            <Link href={track.streaming_links.beatport} target="_blank">
              <PrismicNextImage field={beatport?.data.icon} />
            </Link>
          )}
          {track.streaming_links.youtube && (
            <Link href={track.streaming_links.youtube} target="_blank">
              <PrismicNextImage field={youtube?.data.icon} />
            </Link>
          )}
          {track.streaming_links.apple && (
            <Link href={track.streaming_links.apple} target="_blank">
              <PrismicNextImage field={apple?.data.icon} />
            </Link>
          )}
          {track.streaming_links.discogs && (
            <Link href={track.streaming_links.discogs} target="_blank">
              <PrismicNextImage field={discogs?.data.icon} />
            </Link>
          )}
        </div>
      )}
    </>
  );
}
