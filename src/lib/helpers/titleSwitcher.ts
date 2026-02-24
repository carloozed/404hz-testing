export const titleSwitcher = (
  isActive: string,
  trackCount: number,
  setCount: number
) => {
  if (isActive === 'tracks') {
    return `${trackCount || 0} Tracks Found`;
  } else if (isActive === 'sets') {
    return `${setCount || 0} Sets Scanned`;
  }
};
