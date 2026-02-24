import React, { Dispatch, SetStateAction } from 'react';

import ToggleComponent from './ToggleComponent';

export type ToggleAndSearchProps = {
  setIsActive: Dispatch<SetStateAction<'tracks' | 'sets'>>;
  isActive: 'tracks' | 'sets';
};

export default function ToggleAndSearch({
  setIsActive,
  isActive
}: ToggleAndSearchProps) {
  return (
    <div>
      <ToggleComponent
        setIsActive={setIsActive}
        isActive={isActive}
        optionOne="tracks"
        optionTwo="sets"
        optionOneText="tracks"
        optionTwoText="sets"
      />
    </div>
  );
}
