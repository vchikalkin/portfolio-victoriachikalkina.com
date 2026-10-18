export interface GalleryPhoto {
  id: string;
  /** Full-size URL for lightbox (no forced crop). */
  src: string;
  /** Cropped thumbnail for the grid; falls back to src. */
  thumbSrc?: string;
  alt: string;
  /** Tailwind object-position class for gallery thumbnails (default: center). */
  objectPositionClass?: string;
}
