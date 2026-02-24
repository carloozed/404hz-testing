'use client';

import React, { useRef } from 'react';

import styles from './ButtonBar.module.css';
import ButtonWhite from '@/components/shared/ButtonWhite';
import ButtonBlack from '@/components/shared/ButtonBlack';
import LogoutUser from '@/components/auth/LogoutUser';
import { useUserStore } from '@/stores/UserStore';

import gsap from 'gsap';

import { useGSAP } from '@gsap/react';

type ButtonBarProps = {
  setIsLoginOpen: (isOpen: boolean) => void;
};

export default function ButtonBar({ setIsLoginOpen }: ButtonBarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { user } = useUserStore();

  useGSAP(() => {
    if (!containerRef.current) return;
    gsap.to(containerRef.current, {
      y: '0%',
      duration: 1,
      ease: 'power2.out',
      delay: 0.5
    });
  });

  return (
    <div className={styles.buttonContainer} ref={containerRef}>
      {!user ? (
        <>
          <ButtonWhite
            buttonText="Log In"
            onClick={() => setIsLoginOpen(true)}
            hasText={true}
          />
          <ButtonBlack buttonText="Sign Up" />
        </>
      ) : (
        <LogoutUser />
      )}
    </div>
  );
}
