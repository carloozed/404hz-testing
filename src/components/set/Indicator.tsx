import React from 'react';

import styles from './Indicator.module.css';

type IndicatorProps = {
  setOpen: number | null | undefined;
  index: number | undefined;
  onClick?: () => void;
};

export default function Indicator({ setOpen, index, onClick }: IndicatorProps) {
  return (
    <div
      className={styles.indicatorContainer}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
    >
      <div
        className={`${styles.indicator} ${setOpen === index ? styles.isActive : ''}`}
      ></div>
    </div>
  );
}
