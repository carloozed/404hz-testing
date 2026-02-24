import React, { useEffect } from 'react';

import styles from './PlayPauseButtonTrack.module.css';

//contexts
import { useImages } from '@/providers/ImageContext';

// types
import { Track, PlayerTrack } from '@/types/track';

// stores
import { useTrackPlayerStore } from '@/stores/TrackPlayerStore';
import { usePlayerStore } from '@/stores/PlayerStore';
import { useMiniplayerStore } from '@/stores/useMiniplayerStore';

// helpers
import {
  extractDeezerIdFromUrl,
  getDeezerPreview
} from '@/lib/api/getDeezerPreview';

// prismic components
import { PrismicNextImage } from '@prismicio/next';

type PlayPauseButtonProps = {
  track: PlayerTrack | Track;
  isHovered: number | null;
};

export default function PlayPauseButton({
  track,
  isHovered
}: PlayPauseButtonProps) {
  const { mediaPlayerIcons } = useImages();
  const {
    track: currentTrack,
    audioUrl,
    isPlaying: isTrackPlayerPlaying,
    setIsPlaying: setIsTrackPlayerPlaying,
    setTrack,
    setAudioUrl
  } = useTrackPlayerStore();
  const { setIsPlaying: setIsSetPlayerPlaying } = usePlayerStore();

  const { setShowMiniplayerTrack } = useMiniplayerStore();

  const playIcon = mediaPlayerIcons?.data.play_button;
  const pauseIcon = mediaPlayerIcons?.data.pause_button;

  // pause setplayer if trackplayer is active

  useEffect(() => {
    if (isTrackPlayerPlaying) {
      setIsSetPlayerPlaying(false);
    }
  }, [isTrackPlayerPlaying, setIsSetPlayerPlaying]);

  const fetchPreview = async (track: Track | PlayerTrack) => {
    if (!track.streaming_links.deezer) return;

    // Same track and has audio URL - just toggle play/pause
    if (currentTrack?.id === track.id && audioUrl) {
      setIsTrackPlayerPlaying(!isTrackPlayerPlaying);
      return;
    }

    // Different track or no audio URL yet - fetch and play
    const id = extractDeezerIdFromUrl(track.streaming_links.deezer);
    const url = await getDeezerPreview(id);

    if (!url) return;
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
    setAudioUrl(url);
    setIsTrackPlayerPlaying(true);
  };

  return (
    <div
      onClick={() => {
        fetchPreview(track);
        setShowMiniplayerTrack(true);
      }}
      className={`${styles.imageOverlay} ${currentTrack?.id === track.id ? styles.showAlways : ''} ${isHovered === track.id ? styles.hovered : ''}`}
    >
      <PrismicNextImage
        field={
          isTrackPlayerPlaying && currentTrack?.id === track.id && audioUrl
            ? pauseIcon
            : playIcon
        }
      />
    </div>
  );
}
