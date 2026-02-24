'use client';

import React, { Dispatch, SetStateAction, useEffect } from 'react';

import styles from './AnalyzeField.module.css';

// components
import ButtonBlack from './ButtonBlack';

// helpers
import analyzeMix from '@/lib/helpers/analyzeMix';

// stores
import { useAnalyzeStore } from '@/stores/UseAnalyzeStore';
import { useUserStore } from '@/stores/UserStore';

type AnalyzeFieldProps = {
  width?: string | number;
  showAlert?: boolean;
  setShowAlert?: (showAlert: boolean) => void | undefined;
  setIsWiggling?: (isWiggling: boolean) => void | undefined;
  isWiggling?: boolean;
  url: string;
  setUrl: Dispatch<SetStateAction<string>>;
};

export default function AnalyzeField({
  width,
  setShowAlert,
  setIsWiggling,
  isWiggling,
  url,
  setUrl
}: AnalyzeFieldProps) {
  const {
    isAnalyzing,
    setIsAnalyzing,
    setResponse,
    response,
    isFinishedAnalyzing,
    setIsFinishedAnalyzing,
    errorMessage,
    setErrorMessage
  } = useAnalyzeStore();

  const { user } = useUserStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      if (setShowAlert) setShowAlert(true);
      if (setIsWiggling) setIsWiggling(true);
      setTimeout(() => {
        if (setIsWiggling) setIsWiggling(false);
      }, 2000);
      setTimeout(() => {
        if (setShowAlert) setShowAlert(false);
      }, 4000);
      return;
    }
    analyzeMix({
      e,
      isAnalyzing,
      url,
      setIsAnalyzing,
      setResponse,
      response,
      isFinishedAnalyzing,
      setIsFinishedAnalyzing,
      setErrorMessage
    });
  };

  useEffect(() => {
    if (errorMessage) {
      if (setShowAlert) {
        setShowAlert(true);
        if (setIsWiggling) setIsWiggling(true);
      }

      const alertTimer = setTimeout(() => {
        if (setShowAlert) setShowAlert(false);
        setErrorMessage('');
        if (setIsWiggling) setIsWiggling(false);
      }, 4000);

      return () => clearTimeout(alertTimer);
    }
  }, [errorMessage, setShowAlert, setIsWiggling, setErrorMessage]);

  useEffect(() => {
    if (isFinishedAnalyzing) {
      setUrl('');
    }
  }, [isFinishedAnalyzing, setUrl]);

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className={`${styles.form} ${isWiggling ? styles.wiggle : ''}`}
      >
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL to analyze"
          disabled={isAnalyzing}
          style={{ width: width || 'calc(12rem + 15vw)' }}
          id="analyzefield"
          name="analyzefield"
        />
        <ButtonBlack
          hasImage={false}
          buttonText={isAnalyzing ? 'Analyzing...' : 'Analyze'}
          type="submit"
          disabled={isAnalyzing}
          height={'calc(1.5rem + 1.5vw)'}
        />
      </form>
    </div>
  );
}
