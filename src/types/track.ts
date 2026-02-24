export interface RecordedAt {
  begin_time_offset: string;
  confidence_score: number;
  duration: string;
  end_time_offset: string;
  play_offset: string;
}

export interface SetAssociationsSet {
  author: string;
  genre: string;
  id: number;
  title: string;
  url?: string | undefined;
}

export interface SetAssociations {
  begin_time_offset_ms: number;
  confidence_score: number;
  duration_ms: number;
  end_time_offset_ms: number;
  play_offset_ms: number;
  set: SetAssociationsSet;
}

export interface StreamingLinks {
  apple: string | null;
  deezer: string | null;
  spotify: string | null;
  youtube: string | null;
  bandcamp: string | null;
  beatport: string | null;
  discogs: string | null;
}

export interface Track {
  id: number;
  title: string;
  author: string;
  label: string | null;
  genre: string | null;
  album_cover: string;
  streaming_links: StreamingLinks;
  created_at: string;
  updated_at: string;
  user?: number;
  set?: number[];
  confidence_score?: number;
  set_associations: SetAssociations[];
  recorded_at: RecordedAt;
}

export interface TrackResults {
  count: number;
  next: string | null;
  previous: string | null;
  results: Track[];
}

export type PlayerTrack = Pick<
  Track,
  | 'id'
  | 'title'
  | 'author'
  | 'album_cover'
  | 'recorded_at'
  | 'confidence_score'
  | 'streaming_links'
  | 'set_associations'
>;
