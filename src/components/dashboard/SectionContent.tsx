import React from 'react';

import styles from './SectionContent.module.css';

type ContentProps = {
  children: React.ReactNode;
};

export default function Content({ children }: ContentProps) {
  return <div className={styles.container}>{children}</div>;
}
