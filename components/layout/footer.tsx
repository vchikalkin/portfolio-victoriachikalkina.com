import { getTranslations } from 'next-intl/server';
import { FacebookIcon } from '@/components/icons/facebook-icon';
import { InstagramIcon } from '@/components/icons/instagram-icon';
// import { TelegramIcon } from '@/components/icons/telegram-icon';
import { YoutubeIcon } from '@/components/icons/youtube-icon';
import { Container } from '@/components/ui/container';
import { siteConfig } from '@/config/site';

const socialLinks = [
  {
    key: 'instagram',
    href: siteConfig.social.instagram,
    icon: InstagramIcon,
    label: 'Instagram',
  },
  {
    key: 'facebook',
    href: siteConfig.social.facebook,
    icon: FacebookIcon,
    label: 'Facebook',
  },
  {
    key: 'youtube',
    href: siteConfig.social.youtube,
    icon: YoutubeIcon,
    label: 'YouTube',
  },
  // {
  //   key: 'telegram',
  //   href: siteConfig.social.telegram,
  //   icon: TelegramIcon,
  //   label: 'Telegram',
  // },
] as const;

export async function Footer() {
  const t = await getTranslations('Footer');
  const year = new Date().getFullYear();

  return (
    <footer className="border-border border-t py-12 md:py-16">
      <Container className="flex flex-col items-center gap-8 text-center">
        <div>
          <p className="text-foreground/60 mb-4 text-sm tracking-[0.2em] uppercase">
            {t('follow')}
          </p>
          <div className="flex items-center justify-center gap-4">
            {socialLinks.map(({ key, href, icon: Icon, label }) => {
              return (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  <Icon className="size-5" />
                </a>
              );
            })}
          </div>
        </div>
        <p className="text-foreground/50 text-sm">
          {t('copyright', { year })} | {t('developedBy')}{' '}
          <a
            href={t('developer')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-foreground"
          >
            {t('developer')}
          </a>
        </p>
      </Container>
    </footer>
  );
}
