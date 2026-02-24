import React, { useEffect, useState, useRef } from 'react';

import styles from './FAQRightContainer.module.css';

// prismic types
import { FaqItemDocument } from '@/prismicio-types';

// prismic components
import { PrismicRichText } from '@prismicio/react';

// components
import FadeIn from '@/components/shared/FadeIn';

// external libraries
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

type RightContainerProps = {
  faqItems: FaqItemDocument[];
  isActive: string | undefined;
};

export default function RightContainer({
  faqItems,
  isActive
}: RightContainerProps) {
  const [mappingArray, setMappingArray] = useState<FaqItemDocument[]>([]);
  const foldoutRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openduration = 0.3;

  useEffect(() => {
    const filtered = faqItems.filter(
      (item) => item.data.belongs_to === isActive
    );

    setMappingArray(
      filtered.sort(
        (a, b) => (Number(a.data.index) || 0) - (Number(b.data.index) || 0)
      )
    );
    setActiveIndex(null); // Reset when category changes
  }, [isActive, faqItems]);

  const handleClick = (index: number) => {
    const itemEl = foldoutRefs.current[index];
    if (!itemEl) return;

    if (activeIndex === index) {
      gsap.to(itemEl, {
        height: '3.5rem',
        duration: openduration,
        ease: 'power2.inOut'
      });
      setActiveIndex(null);
    } else {
      if (activeIndex !== null && foldoutRefs.current[activeIndex]) {
        gsap.to(foldoutRefs.current[activeIndex], {
          height: '3.5rem',
          duration: openduration,
          ease: 'power2.inOut'
        });
      }

      gsap.to(itemEl, {
        height: 'auto',
        duration: openduration,
        ease: 'power2.inOut'
      });
      setActiveIndex(index);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        {mappingArray.map((item, index) => (
          <FadeIn key={item.id || index} delay={index * 0.04}>
            <div
              className={styles.item}
              ref={(el) => {
                foldoutRefs.current[index] = el;
              }}
              style={{ height: '3.5rem', overflow: 'hidden' }}
            >
              <div>
                <div
                  className={styles.titleContainer}
                  onClick={() => handleClick(index)}
                >
                  <PrismicRichText field={item.data.title} />
                  <div
                    className={`${styles.plus} ${activeIndex === index ? styles.active : ''}`}
                  >
                    <div></div>
                    <div></div>
                  </div>
                </div>
                <div className={styles.textContainer}>
                  <PrismicRichText field={item.data.description} />
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
