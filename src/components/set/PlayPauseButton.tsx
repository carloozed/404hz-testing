import React from 'react';

import styles from './PlayPauseButton.module.css';

// contexts
import { useImages } from '@/providers/ImageContext';

// stores
import { usePlayerStore } from '@/stores/PlayerStore';

// types
import { Set } from '@/types/set';

// prismic components
import { PrismicNextImage } from '@prismicio/next';

type PlayPauseButtonProps = {
  isHovered: number | null;
  set: Set;
};

export default function PlayPauseButton({
  isHovered,
  set
}: PlayPauseButtonProps) {
  const { mediaPlayerIcons } = useImages();
  const {
    setMixURL,
    setMixIsPlaying,
    mixIsPlaying,
    setIsPlaying,
    isPlaying,
    setMixAuthor,
    setMixThumbnail,
    setMixTitle,
    setMixSource,
    setMixGenre
  } = usePlayerStore();

  const playIcon = mediaPlayerIcons?.data.play_button;
  const pauseIcon = mediaPlayerIcons?.data.pause_button;

  const handlePlayIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    // If clicking on a different mix, load it and start playing
    if (mixIsPlaying !== set.id || !isPlaying) {
      setMixIsPlaying(set.id);
      setMixURL(set.url);
      setMixAuthor(set.author);
      setMixThumbnail(set.thumbnail);
      setMixTitle(set.title);
      setMixSource(set.source);
      if (set.genre !== null) {
        setMixGenre(set.genre);
      } else setMixGenre('');

      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div
      className={`${styles.imageOverlay} ${mixIsPlaying === set.id ? styles.showAlways : ''} ${isHovered === set.id ? styles.hovered : ''}`}
    >
      <PrismicNextImage
        field={isPlaying && mixIsPlaying === set.id ? pauseIcon : playIcon}
        onClick={handlePlayIconClick}
      />
    </div>
  );
}
