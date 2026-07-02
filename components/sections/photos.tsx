import { getTranslations } from 'next-intl/server';
import { PhotoGallery } from '@/components/sections/photos/photo-gallery';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { sectionIds } from '@/config/site';
import { getGalleryImages } from '@/lib/photos';
import type { GalleryPhoto } from '@/lib/types/photos';

export async function PhotosSection() {
  const t = await getTranslations('Photos');
  const imagePaths = getGalleryImages();

  const photos: GalleryPhoto[] = imagePaths.map((src, index) => { return {
    id: src,
    src,
    alt: t('imageAlt', { number: index + 1 }),
  } });

  if (photos.length === 0) {
    return null;
  }

  return (
    <Section id={sectionIds.photos} variant="muted">
      <Container>
        <SectionHeading title={t('title')} subtitle={t('subtitle')} />
        <PhotoGallery
          photos={photos}
          labels={{
            close: t('close'),
            next: t('next'),
            openPhoto: t('openPhoto'),
            previous: t('previous'),
          }}
        />
      </Container>
    </Section>
  );
}
