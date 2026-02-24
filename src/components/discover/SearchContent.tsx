'use client';

import React, { useEffect } from 'react';

import styles from './SearchContent.module.css';

// components
import ResultsContainer from './DiscoverResultsContainer';
import LoadingPage from '@/components/shared/LoadingPage';
import NoResults from './NoResults';

// stores
import { useTrackSearchStore } from '@/stores/UseTrackSearchStore';

// prismic types
import { SearchDocument } from '@/prismicio-types';

// prismic helpers
import { asText } from '@prismicio/client';

// varia
import { useRouter } from 'next/navigation';

type SearchContentProps = {
  page: SearchDocument;
};

export default function SearchContent({ page }: SearchContentProps) {
  const router = useRouter();

  const { filters, areFiltersEmpty, tracks, loading } = useTrackSearchStore();

  useEffect(() => {
    if (areFiltersEmpty()) {
      router.push('/discover');
    }
  }, [filters, areFiltersEmpty, router]);

  if (areFiltersEmpty()) {
    return null;
  }

  if (loading && tracks.length === 0) {
    return <LoadingPage />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.searchResults}>
        <div className={styles.titleContainer}>
          <h2>
            {asText(page.data.search_results_title)} {filters.q}
          </h2>
          <div>Sortbar</div>
        </div>
        <div className={styles.results}>
          {tracks.length === 0 ? (
            <NoResults page={page} />
          ) : (
            <ResultsContainer />
          )}
        </div>
      </div>
    </div>
  );
}
