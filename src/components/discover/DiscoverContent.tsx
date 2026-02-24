'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './DiscoverContent.module.css';

// types
import {
  DiscoverDocument,
  GlobalSearchGenresDocument,
} from '@/prismicio-types';
import SearchSection from './SearchSection';

// components
import NoUser from '@/components/shared/NoUser';

import GenrePreviewContainerTracks from './GenrePreviewContainerTracks';
import Searchbar from './Searchbar';

// prismic components
import { KeyTextField } from '@prismicio/client';

// stores
import { useGlobalSearchGenresStore } from '@/stores/GlobalSearchGenresStore';
import { useTrackSearchStore } from '@/stores/UseTrackSearchStore';
import { useUserStore } from '@/stores/UserStore';

type DiscoverContentProps = {
  page: DiscoverDocument;
  genres: GlobalSearchGenresDocument;
};

export default function DiscoverContent({
  page,
  genres
}: DiscoverContentProps) {
  const { user } = useUserStore();
  const [isStuck, setIsStuck] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const { reset } = useTrackSearchStore();

  const { setGlobalSearchGenres } = useGlobalSearchGenresStore();

  useEffect(() => {
    setGlobalSearchGenres(genres);
  }, [genres, setGlobalSearchGenres]);

  useEffect(() => {
    reset();
  }, [reset]);

  const [isFilterActive, setIsFilterActive] = useState<
    string[] | KeyTextField[]
  >([]);

  useEffect(() => {
    if (!user) return;

    const sentinel = sentinelRef.current;
    if (!sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStuck(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: '0px',
      },
    );

    observer.observe(sentinel);

    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, [user]);

  useEffect(() => {}, [isStuck]);

  if (!user) {
    return (
      <div className={styles.main}>
        <NoUser />
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <div className={styles.searchcontainer}>
        <SearchSection
          page={page}
          user={user}
          isFilterActive={isFilterActive}
          setIsFilterActive={setIsFilterActive}
        />

        <div ref={sentinelRef} style={{ height: '1px' }} />

        <div className={`${styles.searchbar} ${isStuck ? styles.stuck : ''}`}>
          <Searchbar
            page={page}
            isFilterActive={isFilterActive}
            setIsFilterActive={setIsFilterActive}
            isStuck={isStuck}
          />
        </div>

        <div className={styles.previewContainer}>
          <GenrePreviewContainerTracks />
        </div>
      </div>
    </div>
  );
}
