'use client';

import React from 'react';

import styles from './PlaceholderImage.module.css';

// prismic component imports
import { PrismicNextImage } from '@prismicio/next';

// context
import { useImages } from '@/providers/ImageContext';

type PlaceholderProps = {
  height?: string;
  width?: string;
};

export default function PlaceholderImageSong({
  height,
  width
}: PlaceholderProps) {
  const { placeholderImageSong } = useImages();

  return (
    <div
      className={styles.placeholder}
      style={{ width: width, height: height }}
    >
      <PrismicNextImage
        field={placeholderImageSong?.data.placeholder_image_track}
        style={{ width: width, height: height }}
      />
    </div>
  );
}
