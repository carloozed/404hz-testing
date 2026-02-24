import React, { Dispatch, SetStateAction, useState } from 'react';

import styles from './Searchbar.module.css';

// components
import GlobalSearch from '@/components/shared/GlobalSearch';
import Filterbar from './Filterbar';

// prismics
import { KeyTextField } from '@prismicio/client';
import { DiscoverDocument } from '@/prismicio-types';

type SearchbarProps = {
  page: DiscoverDocument;
  isFilterActive: string[] | KeyTextField[];
  setIsFilterActive: Dispatch<SetStateAction<string[] | KeyTextField[]>>;
  isStuck: boolean;
};

export default function Searchbar({
  page,
  isFilterActive,
  setIsFilterActive,
  isStuck
}: SearchbarProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div
      className={styles.globalSearch}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ pointerEvents: 'all', zIndex: '2', width: '100%' }}>
        <GlobalSearch
          isFilterActive={isFilterActive}
          page={page}
          isStuck={isStuck}
          height="3rem"
          hasImage={false}
        />
      </div>
      <div
        style={{
          transform: `${isStuck && isHovered ? 'translateY(-20%) translateX(-39%)' : isStuck ? 'translateY(-180%) translateX(-39%)' : 'translateX(0%)'}`,
          transition: 'transform 0.4s var(--bezier)'
        }}
      >
        <Filterbar
          setIsFilterActive={setIsFilterActive}
          isFilterActive={isFilterActive}
          page={page}
        />
      </div>
    </div>
  );
}
