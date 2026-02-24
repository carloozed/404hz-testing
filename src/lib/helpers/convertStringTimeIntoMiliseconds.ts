export function convertStringTimeIntoMiliseconds(timestamp?: string): number {
  if (!timestamp) return 0;

  const parts = timestamp.split(':');

  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  if (parts.length === 3) {
    hours = parseInt(parts[0], 10);
    minutes = parseInt(parts[1], 10);
    seconds = parseFloat(parts[2]);
  } else if (parts.length === 2) {
    minutes = parseInt(parts[0], 10);
    seconds = parseFloat(parts[1]);
  } else if (parts.length === 1) {
    seconds = parseFloat(parts[0]);
  }

  const totalMs = hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000;

  return Math.floor(totalMs);
}
