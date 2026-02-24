export const convertToHours = (time: string): string => {
  const [minutes, seconds] = time.split(':').map(Number);

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return [hours, remainingMinutes, seconds]
    .map((val) => val.toString().padStart(2, '0'))
    .join(':');
};
