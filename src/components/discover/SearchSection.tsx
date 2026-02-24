import React, { Dispatch, SetStateAction } from 'react';

import styles from './SearchSection.module.css';

// prismic types
import { DiscoverDocument } from '@/prismicio-types';

// prismic components
import { KeyTextField } from '@prismicio/client';
import { PrismicRichText } from '@prismicio/react';

// types
import { User } from '@/types/user';

// external libraries
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

type SearchSectionProps = {
  page: DiscoverDocument;
  user: User;
  isFilterActive?: string[] | KeyTextField[];
  setIsFilterActive?: Dispatch<SetStateAction<string[] | KeyTextField[]>>;
};

export default function SearchSection({ page }: SearchSectionProps) {
  return (
    <section className={styles.searchsection}>
      <div className={styles.searchfield}>
        <div className={styles.title}>
          <PrismicRichText field={page.data.title} />
          <div className={styles.textblock}>
            <PrismicRichText field={page.data.discover_description} />
          </div>
        </div>
      </div>
    </section>
  );
}
