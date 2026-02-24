import React from 'react';

import styles from './MiniplayerInfo.module.css';

//components
import RecordedAt from './RecordedAt';
import ArtistContainer from './ArtistContainer';
import TracknameContainer from './TracknameContainer';
import Buylinks from './Buylinks';
import FoundInSets from './FoundInSets';

// stores
import { usePlayerStore } from '@/stores/PlayerStore';
import { getSetIds } from '@/lib/helpers/getSetIds';

// types
import { TrackVariants } from '@/types/trackVariants';
import { PlayerTrack } from '@/types/track';

type MiniplayerInfoProps = {
  track: PlayerTrack;
  hasBorder: boolean;
  variant: TrackVariants;
};

export default function MiniplayerInfo({
  track,
  variant
}: MiniplayerInfoProps) {
  const { mixIsPlaying } = usePlayerStore();

  const setIds = getSetIds(track.set_associations);

  return (
    <div className={styles.infoContainerPlayer}>
      <TracknameContainer track={track} />
      <ArtistContainer track={track} />

      {setIds.includes(mixIsPlaying as number) ? (
        <RecordedAt track={track} variant={variant} />
      ) : (
        <FoundInSets setIds={setIds} />
      )}

      <div className={styles.lowercontainer}>
        <Buylinks track={track} variant="miniplayer" />
      </div>
    </div>
  );
}
