import { getTranslations } from 'next-intl/server';
import { MediaCard } from '@/components/sections/media/media-card';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { sectionIds } from '@/config/site';
import type { MediaItem } from '@/lib/types/content';

export async function MediaSection() {
  const t = await getTranslations('Media');
  const items = t.raw('items') as MediaItem[];
  const videos = items.filter((item) => item.type === 'video');
  const audio = items.filter((item) => item.type === 'audio');

  return (
    <Section id={sectionIds.media}>
      <Container>
        <SectionHeading title={t('title')} subtitle={t('subtitle')} />

        {videos.length > 0 ? (
          <div className="mb-16">
            <h3 className="mb-6 font-serif text-xl md:text-2xl">{t('videoTab')}</h3>
            <div className="grid gap-6 md:grid-cols-2">
              {videos.map((item) => (
                <MediaCard key={item.id} item={item} placeholder={t('placeholder')} />
              ))}
            </div>
          </div>
        ) : null}

        {audio.length > 0 ? (
          <div>
            <h3 className="mb-6 font-serif text-xl md:text-2xl">{t('audioTab')}</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {audio.map((item) => (
                <MediaCard key={item.id} item={item} placeholder={t('placeholder')} />
              ))}
            </div>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
