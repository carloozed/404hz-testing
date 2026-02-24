import React, { Dispatch, SetStateAction } from 'react';
import styles from './FAQLeftContainer.module.css';

// prismic types
import { FaqDocument } from '@/prismicio-types';

// prismic components
import { PrismicRichText } from '@prismicio/react';

// components
import FadeIn from '@/components/shared/FadeIn';

type LeftContainerProps = {
  page: FaqDocument;
  isActive: string | undefined;
  setIsActive: Dispatch<SetStateAction<string | undefined>>;
};

export default function LeftContainer({
  page,
  isActive,
  setIsActive
}: LeftContainerProps) {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <FadeIn yDown={200}>
          <PrismicRichText field={page.data.title} />
        </FadeIn>
      </div>
      <div className={styles.categories}>
        {page.data.categories.map((category, index) => (
          <FadeIn key={index} delay={0.2}>
            <div
              key={index}
              className={`${styles.category} ${isActive === category.identifier ? styles.categoryActive : ''}`}
              onClick={() => setIsActive(category.identifier || undefined)}
            >
              <h5 className={styles.index}>{index + 1}</h5>

              <PrismicRichText field={category.title} />

              <div className={styles.circle}></div>
            </div>{' '}
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
