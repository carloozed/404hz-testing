import React, { useRef, useEffect } from 'react';
import styles from './ResponsesContainer.module.css';

// types
import { AnalyzeResponse } from '@/types/analyze';
import { User } from '@/types/user';

// component imports
import FadeIn from '@/components/shared/FadeIn';
import AnalyzeProgressBar from './AnalyzeProgressBar';
import TrackComponent from '@/components/track/Track';
import AmountFound from './AmountFound';

// stores
import { useMiniplayerStore } from '@/stores/useMiniplayerStore';

type ResponseContainerProps = {
  user: User | null;
  response: AnalyzeResponse | null;
};

export default function ResponsesContainer({
  user,
  response
}: ResponseContainerProps) {
  const shouldShowResponse = user && response;
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { hoveredIndex } = useMiniplayerStore();

  useEffect(() => {
    if (!containerRef.current || !hoveredIndex) return;

    const itemsPerSection = 8;
    const scrollPerSection = 600;
    const scrollPosition =
      Math.floor(hoveredIndex / itemsPerSection) * scrollPerSection;

    containerRef.current.scrollTo({ top: scrollPosition, behavior: 'smooth' });
  }, [hoveredIndex, containerRef]);

  return (
    <>
      {user && (
        <div
          ref={containerRef}
          className={`${styles.responseContainer} ${shouldShowResponse ? styles.responseGood : ''}`}
        >
          <div className={styles.upperContainer}>
            <AnalyzeProgressBar response={response} />
            <AmountFound response={response} />
          </div>
          <div className={styles.responses}>
            {response &&
              response.tracks.map((track, index) => (
                <FadeIn key={index} yDown={150}>
                  <TrackComponent
                    track={track}
                    index={index}
                    height={'auto'}
                    width={'100%'}
                    variant="settrack"
                  />
                </FadeIn>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
