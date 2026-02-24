import React from 'react';

import styles from './not-found.module.css';
import Logo from '@/components/shared/Logo';

import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem
} from '@/components/shared/Marquee';
import Navbar from '@/components/shared/Navbar';

import { createClient } from '@/prismicio';

export default async function NotFound() {
  const client = createClient();

  const navbar = await client.getSingle('navigation');

  const marqueeSpeed = 12;

  return (
    <div className={styles.notFound}>
      {' '}
      <div
        style={{
          height: 'fit-content',
          width: '20rem',
          overflow: 'hidden'
        }}
      >
        <Marquee>
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
                <Logo height={18} />
                <h4>404</h4>
              </MarqueeItem>
            ))}
          </MarqueeContent>
        </Marquee>
      </div>
      <h2
        style={{
          textTransform: 'uppercase',
          textAlign: 'center',
          fontWeight: '300'
        }}
      >
        The page you were looking <br /> for does not exist...
      </h2>{' '}
      <div
        style={{
          height: 'fit-content',
          width: '20rem',
          overflow: 'hidden'
        }}
      >
        <Marquee>
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
                  gap: '1rem'
                }}
              >
                <Logo height={18} />
                <h4>404</h4>
              </MarqueeItem>
            ))}
          </MarqueeContent>
        </Marquee>
      </div>
      <div style={{ paddingTop: 'calc(2rem + 2vw' }}>
        <Navbar navbar={navbar} isSocialbarVisible={false} />
      </div>
    </div>
  );
}
