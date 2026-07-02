'use client';

import { useState } from 'react';
import { PhotoLightbox } from '@/components/gallery/photo-lightbox';
import { SiteImage } from '@/components/ui/site-image';
import type { GalleryPhoto } from '@/lib/types/photos';

interface PhotoGalleryLabels {
  openPhoto: string;
  close: string;
  previous: string;
  next: string;
}

interface PhotoGalleryProps {
  readonly photos: GalleryPhoto[];
  readonly labels: PhotoGalleryLabels;
}

export function PhotoGallery({ photos, labels }: PhotoGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (photos.length === 0) {
    return null;
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-3">
        {photos.map((photo, index) => 
          { return <button
            key={photo.id}
            type="button"
            className="group relative aspect-[4/3] overflow-hidden bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
            aria-label={`${labels.openPhoto}: ${photo.alt}`}
            onClick={() => {
              setActiveIndex(index);
            }}
          >
            <SiteImage
              fill
              src={photo.src}
              alt={photo.alt}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/15" />
          </button> }
        )}
      </div>

      {activeIndex === null ? null : (
        <PhotoLightbox
          photos={photos}
          index={activeIndex}
          labels={{
            close: labels.close,
            next: labels.next,
            previous: labels.previous,
          }}
          onIndexChange={setActiveIndex}
          onClose={() => {
            setActiveIndex(null);
          }}
        />
      )}
    </>
  );
}
