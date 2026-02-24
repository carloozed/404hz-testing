import React from 'react';

import styles from './Bounded.module.css';

type BoundedProps = {
  children: React.ReactNode;
};

export default function Bounded({ children }: BoundedProps) {
  return <div className={styles.container}>{children}</div>;
}
