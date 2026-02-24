'use client';

import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';

import styles from './MixesContainer.module.css';

// components
import FilterEmpty from '@/components/shared/FilterEmpty';
import NoSetsFound from '@/components/shared/NoSetsFound';
import LoadingSets from '@/components/shared/LoadingSets';
import OverviewContentContainer from './OverviewContentContainer';
import SetWrapper from './SetWrapper';
import SetSearchContainer from './SetSearchContainer';

// stores
import { useUserSetsStore } from '@/stores/UserSetsStore';

// types
import { User } from '@/types/user';
import PaginationTrigger from '@/components/shared/PaginationTrigger';

// helpers
import { useSetSearchHook } from '@/hooks/useSetSearchHook';
import { searchMeSets } from '@/lib/api/search/searchMeSets';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

type ScannedMixesProps = {
  user: User | null;
  showSearch: boolean;
  inputValue: string;
  setShowSearch: Dispatch<SetStateAction<boolean>>;
};

export default function ScannedMixes({
  user,
  showSearch,
  inputValue,
  setShowSearch
}: ScannedMixesProps) {
  const [firstLoadFinished, setFirstLoadFinished] = useState(false);
  const [setOpen, setSetOpen] = useState<number | null>(null);

  const { setResults, loading, hasMore, loadMoreSets, loadSets } =
    useUserSetsStore();

  const observerRef = useInfiniteScroll({
    onLoadMore: loadMoreSets,
    hasMore,
    loading,
    rootMargin: '200px'
  });

  useEffect(() => {
    if (user) {
      loadSets();
    }
  }, [loadSets, user]);

  useEffect(() => {
    if (user && setResults.results.length !== 0) {
      setFirstLoadFinished(true);
    }
  }, [user, setResults]);

  const handleToggle = (index: number) => {
    setSetOpen((prev) => (prev === index ? null : index));
  };

  useSetSearchHook(inputValue, 200, searchMeSets, setShowSearch);

  return (
    <>
      {!showSearch ? (
        <OverviewContentContainer>
          <div className={styles.setsContainer}>
            <div className={styles.set}>
              {setResults.count > 0 ? (
                setResults.results.map((set, index) => (
                  <SetWrapper
                    key={set.id}
                    set={set}
                    index={index}
                    isOpen={setOpen === index}
                    onToggle={handleToggle}
                  />
                ))
              ) : setResults.count && firstLoadFinished ? (
                <FilterEmpty />
              ) : loading ? (
                <LoadingSets />
              ) : (
                <NoSetsFound />
              )}
              {hasMore && (
                <PaginationTrigger
                  observerRef={observerRef}
                  loading={loading}
                />
              )}
            </div>
          </div>
        </OverviewContentContainer>
      ) : (
        <SetSearchContainer />
      )}
    </>
  );
}
