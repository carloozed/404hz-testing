import React from 'react';
import styles from './FoundInSets.module.css';

type Props = { setIds: number[] };

export default function FoundInSets({ setIds }: Props) {
  return (
    <div className={styles.foundInMoreSets}>
      <h5>
        Found in <span>{setIds.length} sets</span>
      </h5>
    </div>
  );
}
