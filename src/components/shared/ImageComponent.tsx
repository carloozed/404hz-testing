'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

import LoadingIndicator from './LoadingIndicator';
import PlaceholderImageSong from './PlaceholderImage';

type ImageComponentProps = {
  src: string;
  alt: string;
};

export default function ImageComponent({ src, alt }: ImageComponentProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setImageError(false);
    setIsLoaded(false);
  }, [src]);

  return (
    <>
      {!imageError ? (
        <>
          {!isLoaded && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                width: '100%'
              }}
            >
              <LoadingIndicator />
            </div>
          )}
          <Image
            width={100}
            height={100}
            src={
              src ||
              'https://images.prismic.io/404hertz/aPvULLpReVYa3qND_ImagePlaceholder.png?auto=format,compress'
            }
            alt={`${alt}`}
            onError={() => setImageError(true)}
            onLoad={() => setIsLoaded(true)}
            style={{
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease',
              height: '100%',
              width: '100%'
            }}
          />
        </>
      ) : (
        <PlaceholderImageSong height="100%" width="100%" />
      )}
    </>
  );
}
