// react
import React, { Dispatch, SetStateAction } from 'react';

// types
import { Set } from '@/types/set';
import { SetVariants } from '@/types/setVariants';

// styles
import styles from './CopyContainer.module.css';

// context
import { useIcons } from '@/providers/IconContext';

// helpers
import { copySetUrl } from '@/lib/helpers/copyHelpers/copySetUrl';

// prismic components
import { PrismicNextImage } from '@prismicio/next';

type CopyContainerProps = {
  isCopied: boolean;
  setIsCopied: Dispatch<SetStateAction<boolean>>;
  set: Set;
  variant: SetVariants;
};

export default function CopyContainer({
  isCopied,
  setIsCopied,
  set,
  variant
}: CopyContainerProps) {
  const { copy } = useIcons();

  return (
    <div
      className={`${styles.copycontainer} ${styles[variant]} ${isCopied ? styles.copied : ''}`}
      onClick={() => copySetUrl(set, setIsCopied)}
      // reset copied state when mouse leaves
      onMouseLeave={() => isCopied === true && setIsCopied(false)}
    >
      <PrismicNextImage field={copy?.data.icon} />
    </div>
  );
}
