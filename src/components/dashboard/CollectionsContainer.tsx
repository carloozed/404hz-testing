import React, { useState, useEffect } from 'react';

// components
import SectionTitleContainer from './SectionTitleContainer';

import SectionContainer from './SectionContainer';
import Collection from './Collection';
import Collections from './Collections';

// stores
import { useSearchResultsStore } from '@/stores/UseSearchResults';
import { useFavoritesStore } from '@/stores/useFavoriteStore';

// helpers
import { searchMeTracks } from '@/lib/api/search/searchMeTracks';

export default function CollectionsContainer() {
  const { favorites } = useFavoritesStore();
  const [isActive, setIsActive] = useState<'sets' | 'tracks'>('tracks');
  const [isActiveCollection, setIsActiveCollection] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');

  const { setTrackSearchResults, clearTrackSearchResults } =
    useSearchResultsStore();

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      const hasValue = inputValue.trim() !== '';

      if (hasValue) {
        try {
          const results = await searchMeTracks({ q: inputValue });
          setTrackSearchResults(results);
        } catch (error) {
          console.error('Search failed:', error);
        }
      } else {
        clearTrackSearchResults();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [inputValue, setTrackSearchResults, clearTrackSearchResults]);

  return (
    <SectionContainer>
      <SectionTitleContainer
        isActive={isActive}
        setIsActive={setIsActive}
        title={isActiveCollection === '' ? 'Collections' : isActiveCollection}
        hasToggle={true}
        hasArrow={isActiveCollection !== ''}
        setIsActiveCollection={setIsActiveCollection}
        setInputValue={setInputValue}
        inputValue={inputValue}
        hasTitleSwitcher={isActiveCollection === '' ? false : true}
        trackCount={favorites.length} // or collection.length
        setCount={2}
      />
      {isActiveCollection === '' ? (
        <Collections
          favorites={favorites}
          setIsActiveCollection={setIsActiveCollection}
          isActiveCollection={isActiveCollection}
        />
      ) : (
        <Collection collection={favorites} />
      )}
    </SectionContainer>
  );
}
