export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  /** Tailwind object-position class for gallery thumbnails (default: center). */
  objectPositionClass?: string;
}
