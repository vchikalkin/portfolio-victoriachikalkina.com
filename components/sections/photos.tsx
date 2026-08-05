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

  const photos: GalleryPhoto[] = imagePaths.map((src, index) => {
    return {
      id: src,
      src,
      alt: t('imageAlt', { number: index + 1 }),
    };
  });

  return (
    <Section id={sectionIds.photos} variant="muted">
      <Container>
        <SectionHeading title={t('title')} subtitle={t('subtitle')} />
        {photos.length > 0 ? (
          <PhotoGallery
            photos={photos}
            labels={{
              close: t('close'),
              next: t('next'),
              openPhoto: t('openPhoto'),
              previous: t('previous'),
            }}
          />
        ) : (
          <div className="max-w-md">
            <p className="text-base text-pretty text-foreground/70">{t('empty')}</p>
            <a
              href={`#${sectionIds.contact}`}
              className="mt-4 inline-block text-sm font-medium text-foreground underline-offset-4 hover:underline"
            >
              {t('emptyAction')}
            </a>
          </div>
        )}
      </Container>
    </Section>
  );
}
