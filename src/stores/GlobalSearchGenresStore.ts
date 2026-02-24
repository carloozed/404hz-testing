import { create } from 'zustand';

// prismic types
import { GlobalSearchGenresDocument } from '@/prismicio-types';

export type GlobalSearchGenresStoreProps = {
  globalSearchGenres: GlobalSearchGenresDocument | null;
  setGlobalSearchGenres: (data: GlobalSearchGenresDocument) => void;
};

export const useGlobalSearchGenresStore = create<GlobalSearchGenresStoreProps>(
  (set) => ({
    globalSearchGenres: null,
    setGlobalSearchGenres: (data) => {
      set({
        globalSearchGenres: data
      });
    },
  }),
);
