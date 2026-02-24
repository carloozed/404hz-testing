import React from 'react';

import styles from './TitleContainer.module.css';

// helpers
import { titleSwitcher } from '@/lib/helpers/titleSwitcher';

type TitleContainerProps = {
  isActive: 'tracks' | 'sets';
  trackCount: number;
  setCount: number;
};

export default function TitleContainer({
  isActive,
  trackCount,
  setCount
}: TitleContainerProps) {
  return (
    <div className={styles.titleContainer}>
      <h4>{titleSwitcher(isActive, trackCount, setCount)}</h4>
    </div>
  );
}
