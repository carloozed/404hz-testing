'use client';

import React, { useState, useRef } from 'react';

import styles from './MenuClient.module.css';

// types
import { NavigationDocument } from '@/prismicio-types';

// components
import Navbar from './Navbar';
import Logo from './Logo';

// varia
import { usePathname } from 'next/navigation';

// external libraries
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

type NavigationClientProps = {
  navbar: NavigationDocument;
};

export default function MenuClient({ navbar }: NavigationClientProps) {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  const NavigationProps = {
    navbar: navbar,
    isOpen: isNavigationOpen,
    toggle: () => setIsNavigationOpen(!isNavigationOpen)
  };

  const pathname = usePathname();

  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;

    gsap.to(container, {
      y: 0,
      duration: 0.6,
      ease: 'power2.out'
    });
  }, []);

  return (
    <nav className={styles.navigation} ref={containerRef}>
      <Navbar {...NavigationProps} />{' '}
      <div
        style={{
          pointerEvents: pathname === '/' ? 'none' : 'auto',
          opacity: pathname === '/' ? 0 : 1,
          transition: 'opacity 0.3s ease'
        }}
      >
        <Logo hasLink={true} height={36} />
      </div>{' '}
    </nav>
  );
}
