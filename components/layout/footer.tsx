import { getTranslations } from 'next-intl/server';
import { FacebookIcon } from '@/components/icons/facebook-icon';
import { InstagramIcon } from '@/components/icons/instagram-icon';
import { YoutubeIcon } from '@/components/icons/youtube-icon';
import { Container } from '@/components/ui/container';
import { siteConfig } from '@/config/site';
import { getSiteSettings } from '@/lib/sanity/content';

export async function Footer() {
  const t = await getTranslations('Footer');
  const settings = await getSiteSettings();
  const year = new Date().getFullYear();

  const socialLinks = [
    {
      key: 'instagram',
      href: settings?.instagram || siteConfig.social.instagram,
      icon: InstagramIcon,
      label: 'Instagram',
    },
    {
      key: 'facebook',
      href: settings?.facebook || siteConfig.social.facebook,
      icon: FacebookIcon,
      label: 'Facebook',
    },
    {
      key: 'youtube',
      href: settings?.youtube || siteConfig.social.youtube,
      icon: YoutubeIcon,
      label: 'YouTube',
    },
  ] as const;

  return (
    <footer className="border-t border-border py-12 md:py-16">
      <Container className="flex flex-col items-center gap-8 text-center">
        <div>
          <p className="mb-4 text-sm text-foreground/60">{t('follow')}</p>
          <div className="flex items-center justify-center gap-4">
            {socialLinks.map(({ key, href, icon: Icon, label }) => {
              return (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-foreground/60 hover:text-foreground"
                >
                  <Icon className="size-5" />
                </a>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col items-center gap-1 sm:flex-row sm:gap-2">
          <span className="text-sm text-foreground/50 tabular-nums">
            {t('copyright', { year })}
          </span>
          <span className="hidden text-sm text-foreground/50 sm:inline">|</span>
          <span className="text-sm text-foreground/50">
            {t('developedBy')}{' '}
            <a
              href={t('developerLink')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-foreground"
            >
              {t('developer')}
            </a>
          </span>
        </div>
      </Container>
    </footer>
  );
}
