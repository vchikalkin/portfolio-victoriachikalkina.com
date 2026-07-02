import fs from 'node:fs';
import path from 'node:path';

const imageExt = /\.(?:jpe?g|png|webp)$/iu;

export function getImagesFromPublicDir(dir: string): string[] {
  const directory = path.join(process.cwd(), 'public', dir);

  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory)
    .filter((file) => imageExt.test(file))
    .toSorted((a, b) => a.localeCompare(b))
    .map((file) => `/${dir}/${file}`);
}

export function getHeroImage(): string | undefined {
  const images = getImagesFromPublicDir('hero');

  return images[0];
}

export function getGalleryImages(): string[] {
  return getImagesFromPublicDir('gallery');
}
