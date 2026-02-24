import React, { useState, useEffect } from 'react';

import styles from './MixesLowerContainer.module.css';

// components
import TrackComponent from '@/components/track/Track';
import NoTracksFound from '@/components/shared/NoTracksFound';
import SetInformation from '@/components/set/SetInformation';
import ToggleComponent from './ToggleComponent';

// types
import { Track } from '@/types/track';
import { Set } from '@/types/set';

type LowerContainerProps = {
  setTracks: Track[];
  set: Set;
};

export default function LowerContainer({
  setTracks,
  set
}: LowerContainerProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isActive, setIsActive] = useState<'tracks' | 'info'>('tracks');

  useEffect(() => {
    setVisibleCount(0);
  }, [setTracks]);

  useEffect(() => {
    const batchSize = 5;
    const delay = 50;

    if (visibleCount < setTracks.length) {
      const timer = setTimeout(() => {
        setVisibleCount((prev) => Math.min(prev + batchSize, setTracks.length));
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [visibleCount, setTracks.length]);

  return (
    <div className={styles.container}>
      <div className={styles.toggleContainer}>
        <ToggleComponent
          isActive={isActive}
          setIsActive={setIsActive}
          optionOne="tracks"
          optionTwo="info"
          optionOneText="Tracks"
          optionTwoText="Info"
        />
      </div>

      {isActive === 'info' ? (
        <div className={styles.setInformationContainer}>
          <SetInformation set={set} />
        </div>
      ) : (
        <div className={styles.tracksContainer}>
          {setTracks.length > 0 ? (
            setTracks
              .slice(0, visibleCount)
              .map((track, index) => (
                <TrackComponent
                  index={index}
                  track={track}
                  variant="settrack"
                  key={index}
                />
              ))
          ) : (
            <NoTracksFound />
          )}
        </div>
      )}
    </div>
  );
}
