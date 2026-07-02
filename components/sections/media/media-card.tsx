import { Music2, Play } from 'lucide-react';
import type { MediaItem } from '@/lib/types/content';

interface MediaCardProps {
  readonly item: MediaItem;
  readonly placeholder: string;
}

export function MediaCard({ item, placeholder }: MediaCardProps) {
  const isVideo = item.type === 'video';

  return (
    <article className="group border border-border bg-card">
      <div className="relative flex aspect-video items-center justify-center bg-secondary/60">
        <div className="flex flex-col items-center gap-3 text-foreground/40">
          {isVideo ? <Play className="size-10" /> : <Music2 className="size-10" />}
          <span className="text-xs tracking-[0.15em] uppercase">{placeholder}</span>
        </div>
        {item.platform ? (
          <span className="absolute top-3 right-3 text-xs tracking-wider text-foreground/50 uppercase">
            {item.platform}
          </span>
        ) : null}
      </div>
      <div className="p-5">
        <h3 className="font-serif text-lg leading-snug">{item.title}</h3>
      </div>
    </article>
  );
}
