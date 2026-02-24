import React, { Ref } from 'react';
import LoadingIndicator from './LoadingIndicator';

import styles from './PaginationTrigger.module.css';

type PaginationTriggerProps = {
  loading: boolean;
  observerRef: Ref<HTMLDivElement> | undefined;
};

export default function PaginationTrigger({
  loading,
  observerRef
}: PaginationTriggerProps) {
  return (
    <div ref={observerRef} className={styles.indicator}>
      <h3>Loading...</h3>
      {loading ? <LoadingIndicator /> : ''}
    </div>
  );
}
