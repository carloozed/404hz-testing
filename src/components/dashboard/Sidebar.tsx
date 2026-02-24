'use client';

import React, { Dispatch, SetStateAction } from 'react';

import styles from './Sidebar.module.css';

// prismic types
import { DashboardDocument } from '@/prismicio-types';

type SidebarProps = {
  page: DashboardDocument;
  selectedItem: string;
  setSelectedItem: Dispatch<SetStateAction<string>>;
};

export default function Sidebar({
  page,
  selectedItem,
  setSelectedItem
}: SidebarProps) {
  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.sidebar}>
        {page.data.sidebar.map((item, index) => (
          <button
            key={index}
            className={`${styles.sidebarButton} ${
              selectedItem === item.label?.toLowerCase() ? styles.active : ''
            }`}
            onClick={() => setSelectedItem(item.label?.toLowerCase() || '')}
          >
            <span>0{index + 1}</span> <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
