'use client';

import React from 'react';
import styles from './FormContainer.module.css';

type FormContainerProps = {
  children: React.ReactNode;
  onSubmit?: (e: React.MouseEvent<HTMLFormElement>) => void;
};

export default function FormContainer({
  onSubmit,
  children
}: FormContainerProps) {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      {children}
    </form>
  );
}
