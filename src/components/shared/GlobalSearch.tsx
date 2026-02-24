import React, { useState } from 'react';

import styles from './GlobalSearch.module.css';

// components
import ButtonBlack from './ButtonBlack';

//types
import { DiscoverDocument } from '@/prismicio-types';
import { KeyTextField } from '@prismicio/client';

// helpers
import placeholderSwitcher from './placeholderSwitcher';

// stores
import { useTrackSearchStore } from '@/stores/UseTrackSearchStore';

// varia
import { useRouter } from 'next/navigation';

type GlobalSearchProps = {
  isFilterActive?: string[] | KeyTextField[];
  page?: DiscoverDocument;
  isStuck?: boolean;
  height: string;
  hasText?: boolean;
  hasImage?: boolean;
};

export default function GlobalSearch({
  isFilterActive,
  page,
  height = '3rem',
  hasText = true,
  hasImage
}: GlobalSearchProps) {
  const { setTracksearchFilters } = useTrackSearchStore();
  const router = useRouter();

  const [qValue, setQValue] = useState<string>('');

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        setTracksearchFilters({ q: qValue });
        router.push(`/discover/search?q=${encodeURIComponent(qValue)}`);
      }}
    >
      <div className={styles.inputgroup}>
        <input
          placeholder={`${isFilterActive && page ? placeholderSwitcher(isFilterActive, page) : 'Search'}`}
          style={{ height: height }}
          onChange={(e) => setQValue(e.target.value)}
        />
      </div>
      <div>
        <ButtonBlack
          buttonText="Search"
          height={height}
          arrowContainerWidth="3rem"
          hasImage={hasImage && hasImage}
          hasText={hasText}
        />
      </div>
    </form>
  );
}
