import React from 'react';

import styles from './DashboardMainContainer.module.css';

// components
import Overview from './Overview';
import CollectionsContainer from './CollectionsContainer';

// types
import { User } from '@/types/user';

type MainContainerProps = {
  user: User | null;
  selectedItem?: string;
};

export default function DashboardMainContainer({
  ...mainContainerProps
}: MainContainerProps) {
  const { user, selectedItem } = mainContainerProps;

  const sharedProps = {
    user
  };

  const overviewProps = {
    ...sharedProps,
    selectedItem
  };

  return (
    <div className={styles.container}>
      <div className={styles.overviewContainer}>
        {selectedItem === 'overview' ? (
          <Overview {...overviewProps} />
        ) : selectedItem === 'collections' ? (
          <CollectionsContainer />
        ) : null}
      </div>
    </div>
  );
}
