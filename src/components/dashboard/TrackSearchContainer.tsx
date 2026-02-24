import React from 'react';

import styles from './TrackSearchContainer.module.css';

// components
import ContentContainer from './OverviewContentContainer';
import ItemContainer from './ItemContainer';
import TrackComponent from '@/components/track/Track';

// stores
import { useSearchResultsStore } from '@/stores/UseSearchResults';

export default function TrackSearchContainer() {
  const { searchTrackResults } = useSearchResultsStore();

  return (
    <ContentContainer>
      <div className={styles.tracksList}>
        <ItemContainer>
          {searchTrackResults.length > 0 ? (
            searchTrackResults.map((track, index) => (
              <TrackComponent
                index={index}
                track={track}
                key={track.id || index}
                variant="dashboard"
              />
            ))
          ) : (
            <div className={styles.emptyState}>
              <p>No tracks found</p>
            </div>
          )}
        </ItemContainer>
      </div>
    </ContentContainer>
  );
}
