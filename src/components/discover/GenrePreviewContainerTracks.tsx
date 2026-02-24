import React from 'react';

// components
import Bound from './Bound';
import GenrePreviewTrack from './GenrePreviewTrack';

// stores
import { useGlobalSearchGenresStore } from '@/stores/GlobalSearchGenresStore';

export default function GenrePreviewContainerTracks({}) {
  const { globalSearchGenres } = useGlobalSearchGenresStore();

  return (
    <Bound>
      {globalSearchGenres?.data.genres.map((genre, index) => (
        <GenrePreviewTrack
          genre={genre.item ?? ''}
          query={genre.item ?? ''}
          key={index}
        />
      ))}
    </Bound>
  );
}
