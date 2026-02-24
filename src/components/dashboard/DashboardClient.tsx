'use client';

import React, { useState } from 'react';
import styles from './DashboardClient.module.css';

// components
import NoUser from '@/components/shared/NoUser';
import Sidebar from './Sidebar';
import ContentContainer from './DashboardContentContainer';

// types
import { DashboardDocument } from '@/prismicio-types';

// stores
import { useUserStore } from '@/stores/UserStore';

type DashboardProps = {
  page: DashboardDocument;
};

export default function DashboardClient({ page }: DashboardProps) {
  const { user } = useUserStore();
  const [selectedItem, setSelectedItem] = useState(
    page.data.sidebar[0]?.label?.toLowerCase() || '',
  );

  if (!user) {
    return <NoUser />;
  }

  const sharedProps = { page, selectedItem };
  const SidebarProps = { setSelectedItem, ...sharedProps };
  const ContentContainerProps = {
    user,
    ...sharedProps
  };

  return (
    <div className={styles.container}>
      <Sidebar {...SidebarProps} />
      <ContentContainer {...ContentContainerProps} />
    </div>
  );
}
