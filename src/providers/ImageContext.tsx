'use client';

import React, { createContext, useContext } from 'react';

// prismic types
import {
  ArrowDocument,
  LogoDocument,
  PlaceholderImageTrackDocument,
  WhiteArrowDocument,
} from '@/prismicio-types';
import { MediaPlayerIconsDocument } from '@/prismicio-types';

// Define the context type
type ImageContextType = {
  placeholderImageSong: PlaceholderImageTrackDocument | null;
  mediaPlayerIcons: MediaPlayerIconsDocument | null;
  blackArrow: ArrowDocument;
  whiteArrow: WhiteArrowDocument;
  logo: LogoDocument;
};

const ImageContext = createContext<ImageContextType | undefined>(undefined);

// Props for the provider
export type ImageContextProps = {
  placeholderImageSong: PlaceholderImageTrackDocument | null;
  mediaPlayerIcons: MediaPlayerIconsDocument | null;
  blackArrow: ArrowDocument;
  whiteArrow: WhiteArrowDocument;
  children?: React.ReactNode;
  logo: LogoDocument;
};

// Provider component
export default function ImageProvider({
  placeholderImageSong,
  mediaPlayerIcons,
  blackArrow,
  whiteArrow,
  logo,
  children,
}: ImageContextProps) {
  const value: ImageContextType = {
    placeholderImageSong,
    mediaPlayerIcons,
    blackArrow,
    whiteArrow,
    logo,
  };

  return (
    <ImageContext.Provider value={value}>{children}</ImageContext.Provider>
  );
}

// Custom hook to use the context
export function useImages() {
  const context = useContext(ImageContext);

  if (context === undefined) {
    throw new Error('useImages must be used within an ImageProvider');
  }

  return context;
}
