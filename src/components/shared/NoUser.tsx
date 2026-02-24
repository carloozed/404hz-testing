'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import styles from './NoUser.module.css';
import ButtonWhite from './ButtonWhite';
import ButtonBlack from './ButtonBlack';

export default function NoUser() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <section className={styles.nouser}>
        <h2>Get the most out of 404Hz</h2>
        <p>
          Sign in to unlock the full 404Hz experience. Access advanced search,
          save your favorite tracks, and discover personalized music
          recommendations.
        </p>
        <div className={styles.buttonContainer}>
          <ButtonWhite
            buttonText="Log In"
            onClick={() => router.push('/login')}
          />
          <ButtonBlack buttonText="Sign up" />
        </div>
      </section>
    </div>
  );
}
