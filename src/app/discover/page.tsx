import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { asImageSrc } from '@prismicio/client';

import { createClient } from '@/prismicio';
import DiscoverContent from '@/components/discover/DiscoverContent';

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle('discover').catch(() => notFound());
  const genres = await client
    .getSingle('global_search_genres')
    .catch(() => notFound());

  return <DiscoverContent page={page} genres={genres} />;
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle('discover').catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? '' }]
    }
  };
}
