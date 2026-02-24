import React from 'react';
import styles from './PlaceholderStyles.module.css';

export default function NoTracksFound() {
  return (
    <div className={styles.noTracks}>
      <h4>This DJ knows how to dig... Unfortunately, no tracks were found!</h4>
    </div>
  );
}
