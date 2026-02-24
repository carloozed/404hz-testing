import React from 'react';

import styles from './CloseTrackpreview.module.css';

// types
import { SetAssociations } from '@/types/track';

// stores
import { useMiniplayerStore } from '@/stores/useMiniplayerStore';
import { useTrackPlayerStore } from '@/stores/TrackPlayerStore';
import { usePlayerStore } from '@/stores/PlayerStore';

// helpers
import { getSetIds } from '@/lib/helpers/getSetIds';

export default function CloseTrackpreview() {
  const { setShowMiniplayerTrack } = useMiniplayerStore();
  const { setIsPlaying: setIsTrackPlaying, track } = useTrackPlayerStore();
  const { setIsPlaying, mixIsPlaying } = usePlayerStore();

  return (
    <>
      {mixIsPlaying !== null && (
        <div
          className={styles.closeTrackpreview}
          onClick={() => {
            setShowMiniplayerTrack(false);
            setIsTrackPlaying(false);
            setIsPlaying(
              getSetIds(track?.set_associations as SetAssociations[]).includes(
                mixIsPlaying
              )
            );
          }}
        >
          <p>close</p>
        </div>
      )}
    </>
  );
}
