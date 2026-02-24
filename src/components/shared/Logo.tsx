'use client';

import React from 'react';

import styles from './Logo.module.css';

// varia
import Link from 'next/link';

// context
import { useImages } from '@/providers/ImageContext';
import { PrismicNextImage } from '@prismicio/next';

type LogoProps = {
  className?: string;
  onClick?: () => void;
  height?: number;
  width?: number;
  hasLink?: boolean;
};

export default function Logo({
  className = '',
  onClick,
  height,
  width = height && height * 1.2,
  hasLink = false
}: LogoProps) {
  const { logo } = useImages();

  return (
    <div className={styles.logo} style={{ width: width, height: height }}>
      {hasLink ? (
        <Link href="/" onClick={onClick} className={className}>
          <PrismicNextImage
            field={logo.data.logo}
            height={height}
            width={width}
            priority
          />
        </Link>
      ) : (
        <PrismicNextImage
          field={logo.data.logo}
          height={height}
          width={width}
          priority
        />
      )}
    </div>
  );
}
