'use client';

import React, { useState, useEffect } from 'react';
import { HomepageDocument } from '@/prismicio-types';

import Logo from '@/components/shared/Logo';

import styles from './HomepageContent.module.css';
import HomeLoginContainer from './HomeLoginContainer';

// store imports
import { useAnalyzeStore } from '@/stores/UseAnalyzeStore';
import { useUserStore } from '@/stores/UserStore';

// component imports
import ButtonBar from './ButtonBar';
import Catchphrase from './Catchphrase';
import AnalyzeFieldComponent from './AnalyzeFieldComponent';
import ResponsesContainer from './ResponsesContainer';

type HomepageContentProps = {
  page: HomepageDocument;
};

export default function HomepageContent({ page }: HomepageContentProps) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSuccessMessageShown, setIsSuccessMessageShown] = useState(false);

  const { response, isAnalyzing } = useAnalyzeStore();

  const { user } = useUserStore();

  const LoginContainerProps = {
    isLoginOpen,
    setIsLoginOpen,
    isSuccessMessageShown,
    setIsSuccessMessageShown
  };

  useEffect(() => {
    if (user) {
      setIsSuccessMessageShown(true);
      const timer = setTimeout(() => {
        setIsLoginOpen(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [user]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftContainer}>
        <div>
          <HomeLoginContainer {...LoginContainerProps} />
          <Catchphrase isLoginOpen={isLoginOpen} page={page} />
        </div>
        <AnalyzeFieldComponent page={page} />
        <div className={styles.buttonLogoContainer}>
          <ButtonBar setIsLoginOpen={setIsLoginOpen} />
        </div>
      </div>
      <div className={styles.rightContainer}>
        <ResponsesContainer user={user} response={response} />
        <div
          className={`${styles.logoContainer} ${response ? styles.responseReceived : ''} ${isAnalyzing ? styles.animation : ''}`}
        >
          <Logo />
        </div>
      </div>
    </div>
  );
}
