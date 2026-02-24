import React, { useRef, useEffect, useState } from 'react';

import styles from './SetWrapper.module.css';

// component
import SetComponent from '@/components/set/SetComponent';
import MixesLowerContainer from './MixesLowerContainer';

// API helpers
import { fetchSetTracks } from '@/lib/api/sets';

// types
import { Set } from '@/types/set';
import { Track } from '@/types/track';

// external libraries
import { gsap } from 'gsap';

type SetWrapperProps = {
  set: Set;
  index: number;
  isOpen: boolean;
  onToggle: (index: number) => void;
};

export default function SetWrapper({
  set,
  index,
  isOpen,

  onToggle
}: SetWrapperProps) {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoadingTracks, setIsLoadingTracks] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const tracksRef = useRef<HTMLDivElement | null>(null);
  const isAnimatingRef = useRef(false);

  // Fetch tracks when opened for the first time
  useEffect(() => {
    const loadTracks = async () => {
      if (isOpen && !hasFetched) {
        setIsLoadingTracks(true);
        try {
          const response = await fetchSetTracks(set.id);
          const fetchedTracks = response.tracks || [];
          setTracks(fetchedTracks);
          setHasFetched(true);
        } catch (error) {
          console.error('Failed to fetch tracks:', error);
        } finally {
          setIsLoadingTracks(false);
        }
      }
    };

    loadTracks();
  }, [isOpen, hasFetched, set.id]);

  // GSAP animation
  useEffect(() => {
    const tracksElement = tracksRef.current;
    if (!tracksElement || isAnimatingRef.current) return;

    isAnimatingRef.current = true;

    if (isOpen) {
      requestAnimationFrame(() => {
        gsap.set(tracksElement, { height: 'auto' });
        const autoHeight = tracksElement.offsetHeight;
        gsap.set(tracksElement, { height: 0 });

        gsap.to(tracksElement, {
          height: autoHeight,
          duration: 0.6,
          ease: 'power2.out',
          onComplete: () => {
            gsap.set(tracksElement, { height: 'auto' });
            isAnimatingRef.current = false;
          }
        });
      });
    } else {
      gsap.to(tracksElement, {
        height: 0,
        duration: 0.6,
        ease: 'power2.in',
        onComplete: () => {
          isAnimatingRef.current = false;
        }
      });
    }
  }, [isOpen]);

  const handleClick = () => {
    if (isAnimatingRef.current) return;
    onToggle(index);
  };

  return (
    <div className={styles.setWrapper}>
      <div className={styles.SetComponent}>
        <SetComponent
          {...set}
          onClick={handleClick}
          setOpen={isOpen ? index : null}
          index={index}
          variant="default"
        />
      </div>

      <div
        ref={tracksRef}
        className={styles.tracksWrapper}
        style={{ height: 0, overflow: 'hidden' }}
      >
        {isLoadingTracks ? (
          <div style={{ padding: '2rem' }}>Loading tracks...</div>
        ) : (
          <MixesLowerContainer setTracks={tracks} set={set} />
        )}
      </div>
    </div>
  );
}
