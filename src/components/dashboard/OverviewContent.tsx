import React, { useState } from 'react';

// components
import TracksContainer from './DashboardTracksContainer';
import ScannedMixes from './MixesContainer';
import SectionTitleContainer from './SectionTitleContainer';

// stores
import { useUserSetsStore } from '@/stores/UserSetsStore';
import { useUserTracksStore } from '@/stores/UserTracksStore';

// types
import { User } from '@/types/user';

// initializers
import FavoritesInitializer from '@/components/shared/FavoriteInitializer';

type OverviewContentProps = {
  user: User | null;
};

export default function OverviewContent({ user }: OverviewContentProps) {
  const [isActive, setIsActive] = useState<'tracks' | 'sets'>('tracks');
  const { setResults } = useUserSetsStore();
  const { trackResults } = useUserTracksStore();

  const [inputValue, setInputValue] = useState<string>('');
  const [showSearch, setShowSearch] = useState<boolean>(false);

  return (
    <>
      <FavoritesInitializer />
      <SectionTitleContainer
        setIsActive={setIsActive}
        isActive={isActive}
        title={'overview'}
        inputValue={inputValue}
        setInputValue={setInputValue}
        trackCount={trackResults.count}
        setCount={setResults.count}
        hasTitleSwitcher={true}
      />
      {isActive === 'tracks' ? (
        <>
          <TracksContainer
            showSearch={showSearch}
            setShowSearch={setShowSearch}
            inputValue={inputValue}
          />
        </>
      ) : (
        <>
          <ScannedMixes
            user={user}
            showSearch={showSearch}
            inputValue={inputValue}
            setShowSearch={setShowSearch}
          />
        </>
      )}
    </>
  );
}
