'use client';

import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { SiteImage } from '@/components/ui/site-image';
import type { GalleryPhoto } from '@/lib/types/photos';
import { useScrollLock } from '@/lib/use-scroll-lock';
import { cn } from '@/lib/utils';

interface PhotoLightboxLabels {
  close: string;
  previous: string;
  next: string;
}

interface PhotoLightboxProps {
  readonly photos: GalleryPhoto[];
  readonly index: number;
  readonly labels: PhotoLightboxLabels;
  readonly onClose: () => void;
  readonly onIndexChange: (index: number) => void;
}

export function PhotoLightbox({
  photos,
  index,
  labels,
  onClose,
  onIndexChange,
}: PhotoLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const photo = photos[index];
  const hasPrevious = index > 0;
  const hasNext = index < photos.length - 1;

  useScrollLock();

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    dialog.showModal();

    return () => {
      dialog.close();
    };
  }, []);

  const goToPrevious = () => {
    if (hasPrevious) {
      onIndexChange(index - 1);
    }
  };

  const goToNext = () => {
    if (hasNext) {
      onIndexChange(index + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-[100]">
      <button
        type="button"
        className="absolute inset-0 bg-black/95"
        aria-label={labels.close}
        onClick={onClose}
      />

      <dialog
        ref={dialogRef}
        aria-label={photo.alt}
        className="relative z-10 m-0 flex size-full max-h-none max-w-none flex-col border-0 bg-transparent p-0"
        onCancel={(event) => {
          event.preventDefault();
          onClose();
        }}
      >
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
          <p className="text-sm text-white/70">
            {index + 1} / {photos.length}
          </p>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
            aria-label={labels.close}
            onClick={onClose}
          >
            <X className="size-5" />
          </Button>
        </div>

        <div className="relative flex flex-1 items-center justify-center px-4 pb-6 md:px-16">
          <Button
            variant="ghost"
            size="icon"
            disabled={!hasPrevious}
            aria-label={labels.previous}
            className={cn(
              'absolute left-2 z-10 text-white hover:bg-white/10 md:left-4',
              !hasPrevious && 'opacity-30',
            )}
            onClick={goToPrevious}
          >
            <ChevronLeft className="size-6 md:size-8" />
          </Button>

          <div className="relative size-full max-w-6xl">
            <SiteImage
              fill
              src={photo.src}
              alt={photo.alt}
              className="object-contain"
              sizes="100vw"
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            disabled={!hasNext}
            aria-label={labels.next}
            className={cn(
              'absolute right-2 z-10 text-white hover:bg-white/10 md:right-4',
              !hasNext && 'opacity-30',
            )}
            onClick={goToNext}
          >
            <ChevronRight className="size-6 md:size-8" />
          </Button>
        </div>
      </dialog>
    </div>
  );
}
