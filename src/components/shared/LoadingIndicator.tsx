import React from 'react';
import styles from './LoadingIndicator.module.css';
import Logo from './Logo';

export default function LoadingIndicator() {
  return (
    <div className={styles.loadingIndicator}>
      <div className={styles.loader}>
        <Logo />
      </div>
    </div>
  );
}
