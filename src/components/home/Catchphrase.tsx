import React from 'react';

import styles from './Catchphrase.module.css';

// prismic types
import { HomepageDocument } from '@/prismicio-types';

// components
import SetComponent from '@/components/set/SetComponent';

// stores
import { useAnalyzeStore } from '@/stores/UseAnalyzeStore';

// prismic imports
import { PrismicRichText } from '@prismicio/react';

type CatchphraseProps = {
  page: HomepageDocument;
  isLoginOpen?: boolean;
};

export default function Catchphrase({ isLoginOpen, page }: CatchphraseProps) {
  const { response, isFinishedAnalyzing } = useAnalyzeStore();

  return (
    <div
      className={styles.catchphrase}
      style={{
        opacity: `${isLoginOpen ? '0' : '1'}`,
        transition: 'opacity 0.5s ease-in-out'
      }}
    >
      <div
        style={{
          opacity: `${response ? '0' : '1'}`,
          transition: 'opacity 0.4s var(--bezier)'
        }}
      >
        <PrismicRichText field={page.data.catchphrase} />
      </div>

      <div
        className={`${styles.currentlyAnalyzing} ${response ? styles.responseGood : ''}`}
      >
        <h3>
          {isFinishedAnalyzing ? 'Just analyzed: ' : 'currently analyzing:'}
        </h3>
        {response && (
          <SetComponent
            author={response.author}
            thumbnail={response.thumbnail}
            id={response.id}
            genre={response.genre}
            url={response.url}
            title={response.title}
            source={response.url}
            showIndicator={false}
            duration={response.duration}
            waveformWidth="100%"
            textTruncated={true}
            variant="response"
          />
        )}
      </div>
    </div>
  );
}
