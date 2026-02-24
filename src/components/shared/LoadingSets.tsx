import React from 'react';

import LoadingIndicator from './LoadingIndicator';

import styles from './PlaceholderStyles.module.css';

export default function LoadingSets() {
  return (
    <div className={styles.loadingSets}>
      <div className={styles.loadingContainer}>
        <h3>Loading...</h3>
        <LoadingIndicator />
      </div>
    </div>
  );
}
