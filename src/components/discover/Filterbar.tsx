import React, { Dispatch, SetStateAction } from 'react';

import styles from './Filterbar.module.css';

// prismic types
import { KeyTextField } from '@prismicio/client';
import { DiscoverDocument } from '@/prismicio-types';

// prismic components
import { PrismicRichText } from '@prismicio/react';

type FilterbarProps = {
  page: DiscoverDocument;
  isFilterActive: string[] | KeyTextField[];
  setIsFilterActive: Dispatch<SetStateAction<string[] | KeyTextField[]>>;
};

export default function Filterbar({
  page,
  isFilterActive,
  setIsFilterActive
}: FilterbarProps) {
  return (
    <div className={styles.filterbar}>
      {page.data.search_params.map((item) => (
        <div
          key={item.identifier}
          className={`${styles.filteritem} ${isFilterActive.includes(item.identifier as string) ? styles.active : ''}`}
          onClick={() => {
            const id = item.identifier;
            if (id) {
              setIsFilterActive((prev) =>
                prev.includes(id)
                  ? prev.filter((i) => i !== id)
                  : [...prev, id],
              );
            }
          }}
        >
          <PrismicRichText field={item.label} />
        </div>
      ))}
    </div>
  );
}
