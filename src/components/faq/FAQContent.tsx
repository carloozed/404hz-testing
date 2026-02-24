'use client';

import React, { useState } from 'react';

// components
import Bounded from '@/components/shared/Bounded';
import RightContainer from './FAQRightContainer';
import LeftContainer from './FAQLeftContainer';

// prismic types
import { FaqDocument, FaqItemDocument } from '@/prismicio-types';

import styles from './FAQContent.module.css';

type FAQContentProps = {
  page: FaqDocument;
  faqItems: FaqItemDocument[];
};

export default function FAQContent({ page, faqItems }: FAQContentProps) {
  const [isActive, setIsActive] = useState<string | undefined>('about');

  return (
    <Bounded>
      <div className={styles.contentContainer}>
        <LeftContainer
          page={page}
          isActive={isActive}
          setIsActive={setIsActive}
        />
        <RightContainer faqItems={faqItems} isActive={isActive} />
      </div>
    </Bounded>
  );
}
