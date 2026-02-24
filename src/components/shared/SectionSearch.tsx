import React, { FormEvent } from 'react';

import styles from './SectionSearch.module.css';

type SectionSearchProps = {
  isStuck?: boolean;
  height: string;
  hasText?: boolean;
  placeholderText?: string;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
};

export default function SectionSearch({
  height = '3rem',
  placeholderText,
  inputValue,
  setInputValue
}: SectionSearchProps) {
  return (
    <form
      className={styles.form}
      onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}
    >
      <div className={styles.inputgroup}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={
            placeholderText
              ? `search ${placeholderText.toLocaleLowerCase()}`
              : 'search'
          }
          style={{ height: height }}
        />
      </div>
    </form>
  );
}
