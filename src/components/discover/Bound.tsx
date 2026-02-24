import React from 'react';

import styles from './Bound.module.css';

type BoundProps = {
  children: React.ReactNode;
};

export default function Bound({ children }: BoundProps) {
  return <div className={styles.previewContainer}>{children}</div>;
}
