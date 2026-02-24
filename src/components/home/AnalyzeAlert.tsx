import React from 'react';

import styles from './AnalyzeAlert.module.css';

// types
import { User } from '@/types/user';

// stores
import { useAnalyzeStore } from '@/stores/UseAnalyzeStore';

type AlertProps = {
  user: User | null;
  showAlert: boolean;
};

export default function Alert({ user, showAlert }: AlertProps) {
  const { errorMessage } = useAnalyzeStore();

  return (
    <div className={styles.alert}>
      <div
        className={`${styles.alertContent} ${showAlert ? styles.visible : ''}`}
      >
        {/* TODO: better error handling for absent user */}
        {!user ? (
          <>
            <h4>Bot Prevention</h4>
            <p>
              you have to create an account / login first to be able to analyze
              mixes.
            </p>
          </>
        ) : errorMessage !== '' ? (
          <>
            {/* TODO: better error handling for specific errors */}
            <h4>Error 404</h4>
            <p>
              {errorMessage?.includes('Only Soundcloud URLs are supported.')
                ? 'Only Soundcloud URLs are supported.'
                : null}
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
}
