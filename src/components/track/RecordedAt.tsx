import React from 'react';

import styles from './RecordedAt.module.css';

// types
import { TrackVariants } from '@/types/trackVariants';
import { PlayerTrack, Track } from '@/types/track';

// helpers
import { convertToHours } from '@/lib/helpers/convertToHours';
import { convertStringTimeIntoMiliseconds } from '@/lib/helpers/convertStringTimeIntoMiliseconds';
import { useHandleTimestampClick } from '@/lib/helpers/handleTimestampClick';

type RecordedAtProps = {
  track: PlayerTrack | Track;
  hasUnderline?: boolean;
  variant: TrackVariants;
};

export default function RecordedAt({
  track,
  hasUnderline = true,
  variant
}: RecordedAtProps) {
  const { handleTimestampClick } = useHandleTimestampClick();

  if (!track.recorded_at?.begin_time_offset) return null;

  const trackPosition = convertStringTimeIntoMiliseconds(
    track.recorded_at.begin_time_offset
  );

  const clickFunction = (trackPosition: number, track: PlayerTrack) => {
    handleTimestampClick(trackPosition, track);
  };

  return (
    <>
      <div className={`${styles.recordedAt} ${styles[variant]}`}>
        <h5>
          <strong>Found at: </strong>
          <span
            style={{
              textDecoration: hasUnderline ? 'underline' : '',
              cursor: hasUnderline ? 'pointer' : 'auto'
            }}
            onClick={() => clickFunction(trackPosition, track)}
          >
            {convertToHours(track.recorded_at.begin_time_offset)}
          </span>
        </h5>
      </div>
    </>
  );
}
