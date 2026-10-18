import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getRevalidateSecret } from '@/sanity/env';

const revalidateTags = [
  'sanity',
  'siteSettings',
  'biography',
  'concerts',
  'repertoire',
  'media',
  'gallery',
] as const;

const querySchema = z.object({
  secret: z.string().min(1),
});

// Next.js App Router convention
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/require-await -- route handler export
export async function POST(request: NextRequest) {
  const parsed = querySchema.safeParse({
    secret: request.nextUrl.searchParams.get('secret'),
  });

  if (!parsed.success) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  let expected: string;

  try {
    expected = getRevalidateSecret();
  } catch {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  if (parsed.data.secret !== expected) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  try {
    for (const tag of revalidateTags) {
      revalidateTag(tag, { expire: 0 });
    }
  } catch {
    return NextResponse.json({ message: 'Revalidation failed' }, { status: 500 });
  }

  return NextResponse.json({ revalidated: true, tags: revalidateTags });
}
