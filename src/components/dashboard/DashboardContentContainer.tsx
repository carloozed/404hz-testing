import React from 'react';

import styles from './DashboardContentContainer.module.css';

// components
import DashboardMainContainer from './DashboardMainContainer';

// types
import { User } from '@/types/user';

// prismic types
import { DashboardDocument } from '@/prismicio-types';

type ContentContainerProps = {
  page?: DashboardDocument;
  selectedItem?: string;
  user: User | null;
};

export default function ContentContainer({
  user,
  selectedItem
}: ContentContainerProps) {
  const mainContainerProps = {
    user,
    selectedItem
  };

  return (
    <div className={styles.container}>
      <DashboardMainContainer {...mainContainerProps} />
    </div>
  );
}
