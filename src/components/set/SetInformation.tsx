import React from 'react';

import styles from './SetInformation.module.css';

// types
import { Set } from '@/types/set';

// prismic components
import { PrismicNextImage } from '@prismicio/next';

// context
import { useIcons } from '@/providers/IconContext';

// helpers
import formatIsoToDate from '@/lib/helpers/formatIsoToDays';

// varia
import Link from 'next/link';

type SetInformationProps = {
  set: Set;
};

export default function SetInformation({ set }: SetInformationProps) {
  const { soundcloud } = useIcons();

  const cleanUrl = set.url && set.url?.split('/').slice(0, 4).join('/');

  return (
    <div className={styles.overlay}>
      <div className={styles.upperContainer}>
        <h2> {set.title}</h2>{' '}
        {set.genre && (
          <div className={styles.genre}>
            <h4>{set.genre}</h4>
          </div>
        )}
      </div>
      <div className={styles.channelContainer}>
        <Link href={cleanUrl} target="_blank">
          <h3>{set.author}</h3>
        </Link>{' '}
      </div>
      <div className={styles.description}>
        <p>{set.description}</p>
      </div>{' '}
      <div>
        <Link href={set.url} target="_blank">
          <PrismicNextImage field={soundcloud?.data.icon} />
        </Link>
      </div>{' '}
      <div className={styles.smallContainer}>
        <small>
          <span>Duration: </span>
          {set.duration}
        </small>
        <small>
          {' '}
          <span>Created at: </span>
          {formatIsoToDate(set.created_at)}
        </small>
      </div>
    </div>
  );
}
