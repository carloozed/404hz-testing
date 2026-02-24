import React, { useState } from 'react';

// stores
import { useSetSearchResultsStore } from '@/stores/UseSearchResults';

// components
import SetWrapper from './SetWrapper';
import OverviewContentContainer from './OverviewContentContainer';

export default function SetSearchContainer() {
  const { searchSetResults } = useSetSearchResultsStore();
  const [setOpen, setSetOpen] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setSetOpen((prev) => (prev === index ? null : index));
  };

  return (
    <OverviewContentContainer>
      {searchSetResults.length > 0 &&
        searchSetResults.map((set, index) => (
          <SetWrapper
            key={set.id}
            set={set}
            index={index}
            isOpen={setOpen === index}
            onToggle={handleToggle}
          />
        ))}
    </OverviewContentContainer>
  );
}
