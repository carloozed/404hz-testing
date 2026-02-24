import React from 'react';

import styles from './AnalyzeFieldText.module.css';

// prismic components
import { PrismicRichText } from '@prismicio/react';
import { PrismicNextImage } from '@prismicio/next';

// prismic types
import { HomepageDocument } from '@/prismicio-types';

type AnalyzeFieldTextProps = {
  page: HomepageDocument | undefined;
};

export default function AnalyzeFieldText({ page }: AnalyzeFieldTextProps) {
  return (
    <div className={styles.analyzeFieldText}>
      <PrismicRichText field={page && page.data.analyze_field_description} />
      <div className={styles.iconbar}>
        {page?.data.icon_bar.map((item, index) => (
          <div key={index}>
            <PrismicNextImage field={item.icon} />
          </div>
        ))}
      </div>
    </div>
  );
}
