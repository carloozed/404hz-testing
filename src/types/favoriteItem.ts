import { Track, PlayerTrack } from './track';

export interface FavoriteItem {
  id: number;
  track: Track | PlayerTrack;
  created_at: string;
}
