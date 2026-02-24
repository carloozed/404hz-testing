import React, { Dispatch, SetStateAction } from 'react';

import styles from './CollectionFolder.module.css';

// components
import ImageComponent from '@/components/shared/ImageComponent';

// types
import { FavoriteItem } from '@/types/favoriteItem';

type CollectionFolderProps = {
  results: FavoriteItem[];
  label: string;
  isFavorites: boolean;
  isActiveCollection?: string;
  setIsActiveCollection: Dispatch<SetStateAction<string>>;
};

export default function CollectionFolder({
  results,
  label,
  setIsActiveCollection
}: CollectionFolderProps) {
  return (
    <div className={styles.folder}>
      <div
        className={styles.previewImages}
        onClick={() => {
          setIsActiveCollection(label);
        }}
      >
        {results.slice(0, 4).map((result, index) => (
          <div key={index} className={styles.imagecontainer}>
            <ImageComponent
              src={result.track.album_cover}
              alt={result.track.title}
            />
          </div>
        ))}
      </div>
      <div className={styles.label}>
        <h3>{label}</h3>
        <h5>({results.length} items)</h5>
      </div>
    </div>
  );
}
