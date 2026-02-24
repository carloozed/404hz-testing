'use client';
import React, { useState } from 'react';

import AnalyzeField from '@/components/shared/AnalyzeField';
import { HomepageDocument } from '@/prismicio-types';

import styles from './AnalyzeFieldComponent.module.css';

import { useUserStore } from '@/stores/UserStore';
import AnalyzeAlert from './AnalyzeAlert';
import AnalyzeFieldText from './AnalyzeFieldText';

type AnalyzeFieldProps = {
  page?: HomepageDocument;
};

export default function AnalyzeFieldComponent({ page }: AnalyzeFieldProps) {
  const { user } = useUserStore();

  const [url, setUrl] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [isWiggling, setIsWiggling] = useState(false);

  return (
    <div className={styles.analyzeFieldContainer}>
      <div className={styles.analyzeField}>
        <AnalyzeFieldText page={page} />
        <AnalyzeField
          setShowAlert={setShowAlert}
          showAlert={showAlert}
          setIsWiggling={setIsWiggling}
          isWiggling={isWiggling}
          url={url}
          setUrl={setUrl}
        />
      </div>{' '}
      <AnalyzeAlert user={user} showAlert={showAlert} />
    </div>
  );
}
