import React from 'react';

import styles from './NoResults.module.css';

// prismic types
import { SearchDocument } from '@/prismicio-types';

// prismic components
import { PrismicRichText } from '@prismicio/react';

type NoResultsProps = { page: SearchDocument };

export default function NoResults({ page }: NoResultsProps) {
  return (
    <div className={styles.container}>
      <PrismicRichText field={page.data.no_results_text} />
    </div>
  );
}
