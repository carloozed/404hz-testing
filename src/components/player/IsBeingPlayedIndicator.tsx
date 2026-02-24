import styles from './IsBeingPlayedIndicator.module.css';

// store
import { usePlayerStore } from '@/stores/PlayerStore';
import { useTrackPlayerStore } from '@/stores/TrackPlayerStore';

// type
import { SetVariants } from '@/types/setVariants';
import { Track } from '@/types/track';
import { Set } from '@/types/set';

type IsBeingPlayedIndicatorProps = {
  track?: Track | null;
  set?: Set | null;
  variant?: SetVariants;
};

export default function IsBeingPlayedIndicator({
  track,
  set,
  variant
}: IsBeingPlayedIndicatorProps) {
  const { mixIsPlaying } = usePlayerStore();
  const { track: currentTrack } = useTrackPlayerStore();

  if (!set && !track) return null;

  const shouldAnimate =
    (set && mixIsPlaying === set.id) ||
    (track && currentTrack?.id === track.id);

  const typeClass = set ? styles.set : styles.track;
  const variantClass = variant ? styles[variant] : '';

  return (
    <div
      className={`${styles.isBeingPlayedIndicator} ${typeClass} ${variantClass} ${shouldAnimate ? styles.animation : ''}`}
    />
  );
}
