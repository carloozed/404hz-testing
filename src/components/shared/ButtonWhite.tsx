'use client';

import React from 'react';

import styles from './ButtonWhite.module.css';

// components
import WhiteArrow from './WhiteArrow';

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
  height?: string | number;
  onMouseOver?: () => void;
  onMouseLeave?: () => void;
  hasText: boolean;
};

export default function ButtonWhite({
  onClick,
  buttonText,
  arrowWidth,
  arrowHeight,
  type,
  hasImage = true,
  height,
  onMouseOver,
  onMouseLeave,
  hasText = true
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
        className={styles.box}
        style={{ display: hasText ? 'flex' : 'none' }}
      >
        <p>{buttonText ? buttonText : 'White Button'}</p>
      </div>

      {hasImage && (
        <div className={styles.box}>
          <WhiteArrow width={arrowWidth || 11} height={arrowHeight || 11} />
        </div>
      )}
    </button>
  );
}
