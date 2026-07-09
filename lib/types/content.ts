export interface ConcertItem {
  id: string;
  date: string;
  city: string;
  venue: string;
  program: string;
  artists?: string;
  isPast?: boolean;
}

export interface MediaItem {
  id: string;
  title: string;
  type: 'video' | 'audio';
  embedUrl?: string;
  platform?: 'youtube' | 'vimeo' | 'spotify';
}

export interface RepertoireEra {
  id: string;
  title: string;
  works: string[];
}
