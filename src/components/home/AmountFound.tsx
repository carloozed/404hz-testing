'use client';

import React, { useEffect, useState } from 'react';

import styles from './AmountFound.module.css';

// type imports

import { AnalyzeResponse } from '@/types/analyze';

// external libraries
import CountUp from 'react-countup';

type AmountFoundProps = {
  response: AnalyzeResponse | null;
};

export default function AmountFound({ response }: AmountFoundProps) {
  const [amountFound, setAmountFound] = useState<number | undefined>(0);

  useEffect(() => {
    setAmountFound(response?.tracks.length);
  }, [response]);

  return (
    <div className={styles.trackAmount}>
      <h3>
        <span>
          <CountUp end={amountFound as number} preserveValue={true} />
        </span>{' '}
        tracks found
      </h3>
    </div>
  );
}
