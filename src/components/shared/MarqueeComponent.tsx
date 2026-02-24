import React from 'react';
import { Marquee, MarqueeContent, MarqueeFade, MarqueeItem } from './Marquee';
import Logo from './Logo';

type MarqueeProps = {
  text: string;
};

export default function MarqueeComponent({ text }: MarqueeProps) {
  return (
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
        <MarqueeContent speed={10}>
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
              <h4 style={{ fontWeight: '400' }}>{text}</h4>
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </Marquee>
    </div>
  );
}
