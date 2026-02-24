import React from 'react';

import styles from './PlaceholderStyles.module.css';

export default function NoSetsFound() {
  return (
    <div className={styles.noSets}>
      <h2>You haven&apos;t scanned any mixes</h2>
    </div>
  );
}
