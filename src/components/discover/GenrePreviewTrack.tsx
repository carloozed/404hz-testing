import React, { useEffect, useState } from 'react';

import styles from './GenrePreviewTrack.module.css';

// components
import TrackComponent from '@/components/track/Track';
import BlackArrow from '@/components/shared/BlackArrow';

// types
import { Track } from '@/types/track';

// stores
import { useTrackSearchStore } from '@/stores/UseTrackSearchStore';
import { useUserStore } from '@/stores/UserStore';

// helpers
import { genrePreview } from '@/lib/api/search/genrePreview';

// varia
import { useRouter } from 'next/navigation';

type GenrePreivewTrackProps = {
  genre: string;
  query: string;
};

export default function GenrePreviewTrack({
  genre,
  query
}: GenrePreivewTrackProps) {
  const { user } = useUserStore();

  const { setTracksearchFilters } = useTrackSearchStore();

  const [previews, setPreviews] = useState<Track[]>([]);
  const [count, setCount] = useState<number | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (user) {
      genrePreview('track', query, genre).then((data) => {
        setPreviews(data.results);
        setCount(data.count);
      });
    }
  }, [user, query, genre]);

  if (previews.length === 0) {
    return;
  }

  const mappingArray = previews.slice(0, 5);

  return (
    <div className={styles.genrepreview}>
      <div className={styles.upperContainer}>
        <h3>{genre}</h3>
        <div
          className={styles.seeall}
          onClick={() => {
            setTracksearchFilters({ genre: genre, q: genre });
            router.push(
              `/discover/search?genre=${encodeURIComponent(genre)}&q=${encodeURIComponent(genre)}`
            );
          }}
        >
          <h5>see all {count} tracks </h5>
          <BlackArrow height={8} width={8} />
        </div>
      </div>
      <div className={styles.lowerContainer}>
        <div className={styles.genreinfo}>
          <div className={styles.artistPreview}>
            <h5>Artists</h5>
            {mappingArray.map((preview, index) => (
              <div key={index} className={styles.artistName}>
                <h4>
                  {preview.author}
                  {index !== mappingArray.length - 1 ? ',' : ''}
                </h4>
              </div>
            ))}
            <h4 style={{ textDecoration: 'underline' }}>and many more...</h4>
          </div>
        </div>
        <div className={styles.previewTracks}>
          {mappingArray.map((preview, index) => (
            <TrackComponent
              track={preview}
              key={index}
              index={index}
              variant={'dashboard'}
              height="14rem"
              width="14rem"
              containerHeight="22.5rem"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
