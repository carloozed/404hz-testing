import React from 'react';

import styles from './Collection.module.css';

// components
import ItemContainer from './ItemContainer';
import TrackComponent from '@/components/track/Track';

// types
import { FavoriteItem } from '@/types/favoriteItem';
import { Track } from '@/types/track';

type Props = {
  collection: FavoriteItem[];
};

export default function Collection({ collection }: Props) {
  return (
    <div className={styles.container}>
      <ItemContainer>
        {' '}
        {collection.map((item, index) => (
          <TrackComponent
            index={index}
            track={item.track as Track}
            key={item.track.title}
            variant="dashboard"
          />
        ))}
      </ItemContainer>
    </div>
  );
}
