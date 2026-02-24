import React from 'react';

import styles from './PlaceholderStyles.module.css';

export default function FilterEmpty() {
  return (
    <div className={styles.noFilterResults}>
      <h3>No sets match your current filters</h3>
      <p>Try adjusting your genre or channel selections</p>
    </div>
  );
}
