'use client';

import React, { useEffect } from 'react';

import styles from './LogoutClient.module.css';

// prismic types
import { LogoutSuccessDocument } from '@/prismicio-types';
import { PrismicRichText } from '@prismicio/react';

// components
import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem
} from '@/components/shared/Marquee';
import Logo from '@/components/shared/Logo';

// varia
import { useRouter } from 'next/navigation';

type LogoutClientProps = {
  page: LogoutSuccessDocument;
};

export default function LogoutClient({ page }: LogoutClientProps) {
  const router = useRouter();

  const marqueeSpeed = 12;

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className={styles.container}>
      <Marquee style={{ width: '20rem' }}>
        <MarqueeFade side="left" />
        <MarqueeFade side="right" />
        <MarqueeContent speed={marqueeSpeed}>
          {new Array(10).fill(null).map((_, index) => (
            <MarqueeItem
              key={index}
              style={{
                padding: '0 0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              <Logo height={16} />
              <h4
                style={{
                  textTransform: 'uppercase',
                  fontSize: 'var(--text-s)'
                }}
              >
                Success
              </h4>
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </Marquee>

      <div className={styles.textcontainer}>
        <PrismicRichText field={page.data.logout_was_successful} />
        <PrismicRichText field={page.data.redirect} />
      </div>

      <Marquee style={{ width: '20rem' }}>
        <MarqueeFade side="left" />
        <MarqueeFade side="right" />
        <MarqueeContent direction="right" speed={marqueeSpeed}>
          {new Array(10).fill(null).map((_, index) => (
            <MarqueeItem
              key={index}
              style={{
                padding: '0 0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                color: 'black'
              }}
            >
              <Logo height={16} />
              <h4
                style={{
                  textTransform: 'uppercase',
                  fontSize: 'var(--text-s)'
                }}
              >
                Success
              </h4>
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </Marquee>
    </div>
  );
}
