import React from 'react';

import styles from './LoadingPage.module.css';

import LoadingIndicator from './LoadingIndicator';

export default function LoadingPage() {
  return (
    <div className={styles.loadingPage}>
      {' '}
      <h4>Loading...</h4>
      <div className={styles.indicator}>
        <LoadingIndicator />
      </div>
    </div>
  );
}
