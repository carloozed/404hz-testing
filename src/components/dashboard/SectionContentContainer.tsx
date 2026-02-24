import React from 'react';

type ContentContainerProps = {
  children: React.ReactNode;
};

import styles from './SectionContentContainer.module.css';

export default function ContentContainer({ children }: ContentContainerProps) {
  return <div className={styles.container}>{children}</div>;
}
