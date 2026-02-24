'use client';

import React from 'react';

import styles from './ButtonBlack.module.css';

// types
import { User } from '@/types/user';

// components
import BlackArrow from './BlackArrow';

export type ButtonProps = {
  onClick?: () => void;
  buttonText: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset';
  arrowWidth?: number;
  arrowHeight?: number;
  hasImage?: boolean;
  hasText?: boolean;
  height?: string | number;
  onMouseOver?: () => void;
  onMouseLeave?: () => void;
  user?: User | null;
  arrowContainerWidth?: string;
};

export default function ButtonBlack({
  onClick,
  buttonText,
  arrowWidth,
  arrowHeight,
  type,
  hasImage = true,
  hasText = true,
  height = '2rem',
  onMouseOver,
  onMouseLeave,
  arrowContainerWidth
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={styles.button}
      type={type}
      style={{ height: height }}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={` ${styles.textbox}`}
        style={{ display: hasText ? 'flex' : 'none' }}
      >
        <p>{buttonText ? buttonText : 'Black Button'}</p>
      </div>

      {hasImage && (
        <div
          className={` ${styles.imagebox}`}
          style={{ width: arrowContainerWidth && arrowContainerWidth }}
        >
          <BlackArrow height={arrowHeight || 11} width={arrowWidth || 11} />
        </div>
      )}
    </button>
  );
}
