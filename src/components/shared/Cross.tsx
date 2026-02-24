import React from 'react';

import styles from './Cross.module.css';

type CrossProps = {
  onClick: () => void;
};

export default function Cross({ onClick }: CrossProps) {
  return (
    <div className={styles.crossContainer} onClick={onClick}>
      <div className={styles.cross}>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
