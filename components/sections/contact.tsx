import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { sectionIds, siteConfig } from '@/config/site';
import { getSiteSettings } from '@/lib/sanity/content';

export async function ContactSection() {
  const settings = await getSiteSettings();
  const email = settings?.contactEmail || siteConfig.contactEmail;
  const title = settings?.contactTitle;
  const subtitle = settings?.contactSubtitle;
  const description = settings?.contactDescription;

  if (!title && !description) {
    return null;
  }

  return (
    <Section id={sectionIds.contact} variant="muted">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            title={title || ''}
            subtitle={subtitle}
            align="center"
          />
          {description ? (
            <p className="text-base leading-relaxed text-pretty text-foreground/70 md:text-lg">
              {description}
            </p>
          ) : null}
          <a
            href={`mailto:${email}`}
            className="mt-10 inline-block text-lg text-foreground underline-offset-4 hover:underline md:text-xl"
          >
            {email}
          </a>
        </div>
      </Container>
    </Section>
  );
}
