/** Convert youtube watch/share URL to embed URL. */
export function toYoutubeEmbedUrl(url: string): string | undefined {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./u, '');

    if (host === 'youtu.be') {
      const id = parsed.pathname.slice(1).split('/')[0];

      return id ? `https://www.youtube.com/embed/${id}` : undefined;
    }

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      if (parsed.pathname.startsWith('/embed/')) {
        return `https://www.youtube.com${parsed.pathname}`;
      }

      const id = parsed.searchParams.get('v');

      return id ? `https://www.youtube.com/embed/${id}` : undefined;
    }
  } catch {
    return undefined;
  }

  return undefined;
}
