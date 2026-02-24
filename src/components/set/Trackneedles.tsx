import React, { useEffect, useState } from 'react';

// components
import ImageComponent from '@/components/shared/ImageComponent';

// types
import { Track } from '@/types/track';
import { Set } from '@/types/set';
import { SetVariants } from '@/types/setVariants';

// styles
import styles from './Trackneedles.module.css';

// stores
import { useMiniplayerStore } from '@/stores/useMiniplayerStore';
import { useTrackPlayerStore } from '@/stores/TrackPlayerStore';
import { usePlayerStore } from '@/stores/PlayerStore';
import { useAnalyzeStore } from '@/stores/UseAnalyzeStore';

// api
import { fetchSetTracks } from '@/lib/api/sets';

// helpers
import { useHandleTimestampClick } from '@/lib/helpers/handleTimestampClick';
import { convertStringTimeIntoMiliseconds } from '@/lib/helpers/convertStringTimeIntoMiliseconds';

type TrackneedlesProps = {
  set: Set;
  convertedTime: number;
  variant: SetVariants;
};

export default function Trackneedles({
  set,
  convertedTime,
  variant
}: TrackneedlesProps) {
  const [fetchedForMixId, setFetchedForMixId] = useState<number | null>(null);
  const { mixIsPlaying } = usePlayerStore();
  const { response: analyzeResponse } = useAnalyzeStore();
  const { handleTimestampClick } = useHandleTimestampClick();

  const {
    isMiniplayerOpen,
    setMiniplayerTracks,
    miniplayerTracks,
    setShowMiniplayerTrack,
    setHoveredTrack,
    setHoveredIndex
  } = useMiniplayerStore();

  const { setTrack } = useTrackPlayerStore();

  // clear tracks when mix changes
  useEffect(() => {
    if (mixIsPlaying !== fetchedForMixId) {
      setMiniplayerTracks([]);
    }
  }, [mixIsPlaying, fetchedForMixId, setMiniplayerTracks]);

  // fetch tracks when miniplayer opens for the currently playing set
  useEffect(() => {
    const isThisSetPlaying = set.id === mixIsPlaying;
    const isAnalyzeResponsePlaying =
      analyzeResponse?.id === mixIsPlaying && set.id === analyzeResponse?.id;

    if (
      (isThisSetPlaying || isAnalyzeResponsePlaying) &&
      isMiniplayerOpen &&
      fetchedForMixId !== mixIsPlaying
    ) {
      const loadTracks = async () => {
        try {
          const response = await fetchSetTracks(set.id);
          const fetchedTracks = response.tracks || [];
          setMiniplayerTracks(fetchedTracks);
          setFetchedForMixId(mixIsPlaying);
        } catch (error) {
          console.error('Failed to fetch tracks:', error);
        }
      };

      loadTracks();
    }
  }, [
    isMiniplayerOpen,
    fetchedForMixId,
    set.id,
    mixIsPlaying,
    setMiniplayerTracks,
    analyzeResponse
  ]);

  const clickhandler = (track: Track) => {
    if (variant !== 'response') {
      // show the overlay with track info without auto-playing
      setShowMiniplayerTrack(true);
      setTrack({
        id: track.id,
        title: track.title,
        author: track.author,
        album_cover: track.album_cover,
        recorded_at: track.recorded_at,
        confidence_score: track.confidence_score,
        streaming_links: track.streaming_links,
        set_associations: track.set_associations
      });
    } else {
      // seek to needle position in the set
      handleTimestampClick(
        convertStringTimeIntoMiliseconds(track.recorded_at.begin_time_offset),
        track
      );
    }
  };

  const shouldShowNeedles = set.id === mixIsPlaying;

  return (
    <div className={`${styles.trackneedles} ${styles[variant]}`}>
      <div className={styles.trackneedlesRelative}>
        {shouldShowNeedles &&
          miniplayerTracks.map((track, index) => (
            <div
              className={styles.needlecontainer}
              key={index}
              style={{
                left: `${
                  (100 / convertedTime) *
                    convertStringTimeIntoMiliseconds(
                      track.recorded_at.begin_time_offset
                    ) +
                  1
                }%`
              }}
              onMouseEnter={() => {
                setHoveredTrack?.(track);
                setHoveredIndex(index);
              }}
              onMouseLeave={() => setHoveredTrack?.(null)}
            >
              <div
                className={styles.needle}
                onClick={() => clickhandler(track)}
              >
                <ImageComponent src={track.album_cover} alt={track.author} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
