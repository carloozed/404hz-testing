'use client';

import React from 'react';

import styles from './Hamburger.module.css';

type HamburgerProps = {
  isOpen: boolean;
  onClick: () => void;
};

export default function Hamburger({ isOpen, onClick }: HamburgerProps) {
  return (
    <div
      onClick={onClick}
      className={`${styles.hamburger} ${isOpen ? styles.open : ''}`}
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
