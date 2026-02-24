import React from 'react';

import { PrismicNextImage } from '@prismicio/next';

import { useImages } from '@/providers/ImageContext';

export type ArrowProps = {
  height?: number;
  width?: number;
};

// gets used in buttons for example

export default function BlackArrow({ height, width }: ArrowProps) {
  const { blackArrow } = useImages();

  return (
    <PrismicNextImage
      field={blackArrow.data.arrow}
      style={{ height: height, width: width }}
    />
  );
}
