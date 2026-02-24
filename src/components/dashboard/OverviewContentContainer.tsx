import React from 'react';

type ContentContainerProps = {
  children: React.ReactNode;
};

import styles from './OverviewContentContainer.module.css';

export default function OverviewContentContainer({
  children
}: ContentContainerProps) {
  return <div className={styles.container}>{children}</div>;
}
