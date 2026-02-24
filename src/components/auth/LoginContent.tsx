'use client';

import React, { useEffect } from 'react';

import styles from './LoginContent.module.css';

// prismic types
import { LoginDocument } from '@/prismicio-types';

// components
import MarqueeComponent from '@/components/shared/MarqueeComponent';
import LoginForm from './LoginForm';

// prismic components
import { PrismicRichText } from '@prismicio/react';

// stores
import { useUserStore } from '@/stores/UserStore';

// varia
import { useRouter } from 'next/navigation';

type LoginContentProps = {
  page: LoginDocument;
};

export default function LoginContent({ page }: LoginContentProps) {
  const router = useRouter();
  const { user } = useUserStore();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);
  return (
    <div className={styles.container}>
      <MarqueeComponent text="Login" />
      <div className={styles.LoginFormContainer}>
        <div className={styles.form}>
          <LoginForm />
        </div>
      </div>{' '}
      <MarqueeComponent text="Login" />
      <div className={styles.signupContainer}>
        <PrismicRichText field={page.data.sign_up_instead} />
      </div>
    </div>
  );
}
