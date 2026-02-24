export interface Set {
  id: number;
  title: string;
  author: string;
  thumbnail: string;
  genre: string | null;
  source: string;
  url: string;
  created_at?: string;
  duration: string;
  description?: string;
}

export interface SetResults {
  count: number;
  next: string | null;
  previous: string | null;
  results: Set[];
}
