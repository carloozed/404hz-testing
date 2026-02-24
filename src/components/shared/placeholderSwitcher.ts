// prismic types
import { DiscoverDocument } from '@/prismicio-types';
import { KeyTextField } from '@prismicio/client';

const placeholderSwitcher = (
  isFilterActive: string[] | KeyTextField[],
  page: DiscoverDocument,
) => {
  const arrayLength = page.data.search_params.length;

  if (isFilterActive.length === 0 || isFilterActive.length === arrayLength) {
    return 'Search all';
  } else if (isFilterActive.length === 1) {
    return `Search for ${isFilterActive[0]}`;
  } else {
    return `Search for ${isFilterActive.join(' & ')}`;
  }
};

export default placeholderSwitcher;
