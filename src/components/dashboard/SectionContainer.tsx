import React from 'react';

import styles from './SectionContainer.module.css';

import Content from './SectionContent';

type SectionContainerProps = {
  children: React.ReactNode;
};

export default function SectionContainer({ children }: SectionContainerProps) {
  return (
    <div className={styles.sectionContainer}>
      <Content>{children}</Content>
    </div>
  );
}
