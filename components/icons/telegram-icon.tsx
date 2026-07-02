import type { SVGProps } from 'react';
import { socialIconClassName } from '@/components/icons/social-icon-utils';

type SocialIconProps = SVGProps<SVGSVGElement>;

export function TelegramIcon({ className, ...props }: SocialIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={socialIconClassName({ className })}
      {...props}
    >
      <path d="M21.5 4.5 2.9 10.5" />
      <path d="M21.5 4.5 14 21.5" />
      <path d="m21.5 4.5-7.5 7" />
    </svg>
  );
}
