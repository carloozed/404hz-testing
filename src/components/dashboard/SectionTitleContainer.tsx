import React, { Dispatch, SetStateAction } from 'react';

import styles from './SectionTitleContainer.module.css';

// components
import TitleContainer from './TitleContainer';
import ToggleAndSearch from './ToggleAndSearch';
import SectionSearch from '@/components/shared/SectionSearch';

// props
import { ToggleAndSearchProps } from './ToggleAndSearch';

// varia
import BlackArrow from '@/components/shared/BlackArrow';

type SectionTitleContainerProps = ToggleAndSearchProps & {
  title: string;
  hasToggle?: boolean;
  isActiveCollection?: string;
  hasArrow?: boolean;
  setIsActiveCollection?: Dispatch<SetStateAction<string>>;
  isSearchbarVisible?: boolean;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  trackCount: number;
  setCount: number;
  hasTitleSwitcher?: boolean;
};

export default function SectionTitleContainer({
  setIsActive,
  isActive,
  title,
  hasToggle = true,
  hasArrow,
  setIsActiveCollection,
  isSearchbarVisible = true,
  inputValue,
  setInputValue,

  hasTitleSwitcher = true,
  trackCount,
  setCount
}: SectionTitleContainerProps) {
  const clickhandler = () => {
    if (setIsActiveCollection) {
      setIsActiveCollection('');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <div className={styles.titleWrapper}>
          <div
            className={`${styles.arrow} ${!hasArrow ? styles.hidden : ''}`}
            onClick={clickhandler}
          >
            <BlackArrow />
          </div>

          <h2 style={{ transform: `translateX(${hasArrow ? '2vw' : '0%'})` }}>
            {title}
          </h2>
        </div>
        {isSearchbarVisible && (
          <div style={{ width: '60%' }}>
            <SectionSearch
              height={'2rem'}
              hasText={false}
              placeholderText={title}
              inputValue={inputValue}
              setInputValue={setInputValue}
            />
          </div>
        )}
      </div>
      <div className={styles.rightContainer}>
        <div>
          {hasTitleSwitcher && (
            <TitleContainer
              trackCount={trackCount}
              setCount={setCount}
              isActive={isActive}
            />
          )}
        </div>
        {hasToggle && (
          <div>
            <ToggleAndSearch setIsActive={setIsActive} isActive={isActive} />
          </div>
        )}
      </div>
    </div>
  );
}
