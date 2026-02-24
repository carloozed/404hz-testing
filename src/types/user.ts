import { Track } from './track';
import { Set } from './set';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string | null;
  tracks: Track[];
  sets: Set[];
}

export type UserResponse = User[];
