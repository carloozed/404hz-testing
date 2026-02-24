import React, { Dispatch, SetStateAction } from 'react';

import styles from './ToggleComponent.module.css';

type ToggleComponentProps<T extends string> = {
  setIsActive: Dispatch<SetStateAction<T>>;
  isActive: T;
  optionOne: T;
  optionTwo: T;
  optionOneText: string;
  optionTwoText: string;
};

export default function ToggleComponent<T extends string>({
  setIsActive,
  isActive,
  optionOne,
  optionTwo,
  optionOneText,
  optionTwoText
}: ToggleComponentProps<T>) {
  const clickHandler = () => {
    setIsActive(isActive === optionOne ? optionTwo : optionOne);
  };

  return (
    <div className={styles.container} onClick={clickHandler}>
      <label>{optionOneText}</label>
      <div className={styles.toggleContainer}>
        <div className={styles.bound}>
          <div
            className={`${styles.toggle} ${isActive === optionTwo ? styles.setsActive : ''}`}
          ></div>
        </div>
      </div>
      <label>{optionTwoText}</label>
    </div>
  );
}
