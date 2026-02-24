'use client';

import React, { useEffect, useState } from 'react';
import styles from './BackgroundContainer.module.css';
import { usePathname } from 'next/navigation';

export default function BackgroundContainer() {
  const pathname = usePathname();
  const [hasGrid, setHasGrid] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasGrid(pathname === '/');
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname, hasGrid]);

  return (
    <div className={styles.backgroundContainer}>
      <div></div>
      <div className={hasGrid ? styles.showGrid : ''}></div>
    </div>
  );
}
