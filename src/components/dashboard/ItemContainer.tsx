import React from 'react';

import styles from './ItemContainer.module.css';

type ItemContainerProps = {
  children: React.ReactNode;
};

export default function ItemContainer({ children }: ItemContainerProps) {
  return <div className={styles.items}>{children}</div>;
}
