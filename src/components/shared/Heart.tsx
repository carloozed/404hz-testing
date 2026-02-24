'use client';

import styles from './Heart.module.css';

// types
import { PlayerTrack, Track } from '@/types/track';

// stores
import { useFavoritesStore } from '@/stores/useFavoriteStore';

type HeartProps = {
  track: Track | PlayerTrack;
  isHovered?: boolean;
};

export default function Heart({ track, isHovered }: HeartProps) {
  const { toggleFavorite, isFavorited } = useFavoritesStore();

  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <clipPath
            id="heartClip"
            clipPathUnits="objectBoundingBox"
            transform="scale(0.00083333, 0.00083333)"
          >
            <path d="m896.4 141.6c-228-45.602-296.4 181.2-296.4 181.2s-68.398-226.8-296.4-181.2c-206.4 42-252 276-178.8 422.4 58.801 120 262.8 259.2 475.2 500.4 212.4-241.2 416.4-380.4 476.4-500.4 73.203-146.4 26.402-380.4-180-422.4z" />
          </clipPath>
        </defs>
      </svg>

      <div
        className={`${styles.heart} ${isHovered ? styles.hovered : ''} ${isFavorited(track.id) ? styles.liked : ''}`}
        onClick={() => toggleFavorite(track)}
      />
    </>
  );
}
