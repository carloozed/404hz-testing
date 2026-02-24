import React from 'react';

import styles from './HomeLoginContainer.module.css';

// components
import LoginForm from '@/components/auth/LoginForm';
import Cross from '@/components/shared/Cross';

// stores
import { useUserStore } from '@/stores/UserStore';

type LoginContainerProps = {
  isLoginOpen: boolean;
  setIsLoginOpen: (isOpen: boolean) => void;
  isSuccessMessageShown: boolean;
};

export default function LoginContainer({
  isLoginOpen,
  setIsLoginOpen,
  isSuccessMessageShown
}: LoginContainerProps) {
  const { user } = useUserStore();

  return (
    <div
      className={`${styles.loginContainer} ${isLoginOpen ? styles.loginopen : ''}`}
    >
      <div className={styles.loginWrapper}>
        <Cross onClick={() => setIsLoginOpen(false)} />
        {!isSuccessMessageShown ? (
          <>
            <div className={styles.welcomeText}>
              <h2>Welcome back!</h2>
              <h5>
                Enter your Login Credentials below or use the options available
              </h5>
            </div>
            <div className={styles.loginFormWrapper}>
              <LoginForm />
            </div>
          </>
        ) : (
          <h3>Welcome, {user ? user.email : 'Digger'}! Have fun digging!</h3>
        )}
      </div>
    </div>
  );
}
