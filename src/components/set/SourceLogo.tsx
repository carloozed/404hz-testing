import React from 'react';

import styles from './SourceLogo.module.css';

// helpers
import { useLogoSwitcher } from '@/lib/helpers/logoSwitcher';

// types
import { Set } from '@/types/set';

// varia
import Link from 'next/link';
import Image from 'next/image';

type SourceLogoProps = { set: Set };

export default function SourceLogo({ set }: SourceLogoProps) {
  const getLogoUrl = useLogoSwitcher();
  return (
    <div className={styles.sourceLogoContainer}>
      <Link href={set.url} target="_blank" rel="noopener noreferrer">
        <Image
          src={getLogoUrl(set.source)}
          alt={`${set.source}`}
          width={25}
          height={25}
        />
      </Link>
    </div>
  );
}
