// hooks/useSearchTracks.ts
import { Dispatch, SetStateAction, useEffect } from 'react';

// types
import { Track } from '@/types/track';

// stores
import { useSearchResultsStore } from '@/stores/UseSearchResults';

export const useTrackSearchHook = (
  inputValue: string,
  debounceMs: number = 500,
  searchFunction: (params: {
    q: string;
  }) => Promise<{ results: Track[]; count: number }>,
  setShowSearch: Dispatch<SetStateAction<boolean>>
) => {
  const { setTrackSearchResults, clearTrackSearchResults } =
    useSearchResultsStore();

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      const hasValue = inputValue.trim() !== '';
      setShowSearch(inputValue ? true : false);

      if (hasValue) {
        try {
          const results = await searchFunction({ q: inputValue });
          setTrackSearchResults(results);
        } catch (error) {
          console.error('Search failed:', error);
        }
      } else {
        clearTrackSearchResults();
      }
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [
    inputValue,
    debounceMs,
    setTrackSearchResults,
    clearTrackSearchResults,
    searchFunction,
    setShowSearch
  ]);
};
