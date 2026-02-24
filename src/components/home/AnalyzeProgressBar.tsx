'use client';

import React from 'react';

import styles from './AnalyzeProgressBar.module.css';

// types
import { AnalyzeResponse } from '@/types/analyze';

// exernal libraries
import CountUp from 'react-countup';

type ProgressBarProps = {
  response: AnalyzeResponse | null;
};

export default function ProgressBar({ response }: ProgressBarProps) {
  const percentage = response?.total_chunks
    ? (response.processed_chunks / response.total_chunks) * 100
    : 0;

  return (
    <div className={styles.progressBarContainer}>
      <div className={styles.progressBar}>
        {Array.from({ length: 80 }, (_, index) => (
          <div
            key={index}
            className={`${styles.progressBarElement} ${percentage > index * 1.25 ? styles.progressFinished : ''}`}
          ></div>
        ))}
      </div>
      <div className={styles.percentageContainer}>
        <h4>
          <CountUp end={percentage} preserveValue={true} />%
        </h4>
      </div>
    </div>
  );
}
