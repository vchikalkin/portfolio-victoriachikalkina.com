import { getTranslations } from 'next-intl/server';
import { MediaCard } from '@/components/sections/media/media-card';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { sectionIds } from '@/config/site';
import { getMediaItems } from '@/lib/sanity/content';

export async function MediaSection() {
  const t = await getTranslations('Media');
  const items = await getMediaItems();
  const videos = items.filter((item) => item.type === 'video');
  const audio = items.filter((item) => item.type === 'audio');

  if (items.length === 0) {
    return null;
  }

  return (
    <Section id={sectionIds.media}>
      <Container>
        <SectionHeading title={t('title')} />

        {videos.length > 0 ? (
          <div className={audio.length > 0 ? 'mb-16' : undefined}>
            <h3 className="mb-6 font-serif text-xl text-balance md:text-2xl">
              {t('videoTab')}
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              {videos.map((item) => {
                return (
                  <MediaCard
                    key={item.id}
                    item={item}
                    placeholder={t('placeholder')}
                  />
                );
              })}
            </div>
          </div>
        ) : null}

        {audio.length > 0 ? (
          <div>
            <h3 className="mb-6 font-serif text-xl text-balance md:text-2xl">
              {t('audioTab')}
            </h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {audio.map((item) => {
                return (
                  <MediaCard
                    key={item.id}
                    item={item}
                    placeholder={t('placeholder')}
                  />
                );
              })}
            </div>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
