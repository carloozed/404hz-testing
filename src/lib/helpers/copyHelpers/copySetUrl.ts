import { Dispatch, SetStateAction } from 'react';

// types
import { Set } from '@/types/set';

export const copySetUrl = (
  set: Set,
  setIsCopied: Dispatch<SetStateAction<boolean>>
) => {
  navigator.clipboard.writeText(`${set.url}`);
  setIsCopied(true);
};
