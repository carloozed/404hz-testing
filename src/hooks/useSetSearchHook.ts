// hooks/useSearchSets.ts
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useSetSearchResultsStore } from '@/stores/UseSearchResults';

import { Set } from '@/types/set';

export const useSetSearchHook = (
  inputValue: string,
  debounceMs: number = 500,
  searchFunction: (params: {
    q: string;
  }) => Promise<{ results: Set[]; count: number }>,
  setShowSearch: Dispatch<SetStateAction<boolean>>
) => {
  const { setSetSearchResults, clearSetSearchResults } =
    useSetSearchResultsStore();

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      const hasValue = inputValue.trim() !== '';
      setShowSearch(inputValue ? true : false);

      if (hasValue) {
        try {
          const results = await searchFunction({ q: inputValue });
          setSetSearchResults(results);
        } catch (error) {
          console.error('Search failed:', error);
        }
      } else {
        clearSetSearchResults();
      }
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [
    inputValue,
    debounceMs,
    setSetSearchResults,
    clearSetSearchResults,
    searchFunction,
    setShowSearch
  ]);
};
