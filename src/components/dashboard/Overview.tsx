import React from 'react';

// components
import OverviewContent from './OverviewContent';
import SectionContainer from './SectionContainer';

// types
import { User } from '@/types/user';

type OverviewProps = {
  user: User | null;
};

export default function Overview({ user }: OverviewProps) {
  return (
    <SectionContainer>
      <OverviewContent user={user} />
    </SectionContainer>
  );
}
