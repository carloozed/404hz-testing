import React from 'react';

import styles from './DiscoverResultsContainer.module.css';

// components
import TrackComponent from '@/components/track/Track';
import PaginationTrigger from '@/components/shared/PaginationTrigger';

// types
import { Track } from '@/types/track';

// stores
import { useTrackSearchStore } from '@/stores/UseTrackSearchStore';

// helpers
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

type ResultContainerProps = {
  tracks?: Track[];
};

export default function ResultsContainer({}: ResultContainerProps) {
  const { tracks, hasMore, loading, loadMoreTracks } = useTrackSearchStore();

  const observerRef = useInfiniteScroll({
    onLoadMore: loadMoreTracks,
    hasMore,
    loading,
    rootMargin: '200px'
  });

  return (
    <>
      {tracks.length > 0 && (
        <div className={styles.resultsContainer}>
          {tracks.map((track, index) => (
            <TrackComponent
              track={track}
              key={index}
              index={index}
              variant={'dashboard'}
              height="14rem"
              width="14rem"
              containerHeight="22.5rem"
            />
          ))}
          {hasMore && (
            <PaginationTrigger observerRef={observerRef} loading={loading} />
          )}
        </div>
      )}
    </>
  );
}
