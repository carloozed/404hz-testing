import React from 'react';

import { useImages } from '@/providers/ImageContext';
import { PrismicNextImage } from '@prismicio/next';

import type { ArrowProps } from './BlackArrow';

// gets used in buttons for example

export default function WhiteArrow({ width, height }: ArrowProps) {
  const { whiteArrow } = useImages();

  return (
    <PrismicNextImage
      field={whiteArrow.data.white_arrow}
      style={{ height: height, width: width }}
    />
  );
}
