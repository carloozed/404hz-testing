import React, { Dispatch, SetStateAction } from 'react';

// components
import ContentContainer from './SectionContentContainer';
import ItemContainer from './ItemContainer';
import CollectionFolder from './CollectionFolder';

// types
import { FavoriteItem } from '@/types/favoriteItem';

type Props = {
  favorites: FavoriteItem[];
  isActiveCollection: string;
  setIsActiveCollection: Dispatch<SetStateAction<string>>;
};

export default function Collections({
  favorites,
  isActiveCollection,
  setIsActiveCollection
}: Props) {
  return (
    <ContentContainer>
      <ItemContainer>
        <CollectionFolder
          results={favorites}
          label={'Favorites'}
          isFavorites={true}
          isActiveCollection={isActiveCollection}
          setIsActiveCollection={setIsActiveCollection}
        />
      </ItemContainer>
    </ContentContainer>
  );
}
