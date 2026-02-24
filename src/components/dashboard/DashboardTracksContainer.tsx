import React, { useEffect, Dispatch, SetStateAction } from 'react';

import styles from './DashboardTracksContainer.module.css';

// components
import TrackComponent from '@/components/track/Track';
import ContentContainer from './OverviewContentContainer';
import ItemContainer from './ItemContainer';

// types
import { User } from '@/types/user';

// stores
import { useUserTracksStore } from '@/stores/UserTracksStore';

import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import TrackSearchContainer from './TrackSearchContainer';
import { useTrackSearchHook } from '@/hooks/useTrackSearchHook';
import { searchMeTracks } from '@/lib/api/search/searchMeTracks';
import PaginationTrigger from '@/components/shared/PaginationTrigger';

type TracksContainerProps = {
  user?: User | null;
  showSearch: boolean;
  inputValue: string;
  setShowSearch: Dispatch<SetStateAction<boolean>>;
};

export default function TracksContainer({
  showSearch,
  setShowSearch,
  inputValue
}: TracksContainerProps) {
  const { trackResults, loadTracks, loading, hasMore, loadMoreTracks } =
    useUserTracksStore();

  const observerRef = useInfiniteScroll({
    onLoadMore: loadMoreTracks,
    hasMore,
    loading,
    rootMargin: '200px'
  });

  useEffect(() => {
    loadTracks();
  }, [loadTracks]);

  useTrackSearchHook(inputValue, 200, searchMeTracks, setShowSearch);

  return (
    <>
      {!showSearch ? (
        <ContentContainer>
          <div className={styles.tracksList}>
            <ItemContainer>
              {trackResults.count > 0 &&
                trackResults.results.map((track, index) => (
                  <TrackComponent
                    index={index}
                    track={track}
                    key={index}
                    variant="dashboard"
                  />
                ))}
            </ItemContainer>
            {hasMore && (
              <PaginationTrigger observerRef={observerRef} loading={loading} />
            )}
          </div>
        </ContentContainer>
      ) : (
        <TrackSearchContainer />
      )}
    </>
  );
}
