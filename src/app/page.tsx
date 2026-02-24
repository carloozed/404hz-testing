import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { asImageSrc } from '@prismicio/client';

import { createClient } from '@/prismicio';

import styles from './page.module.css';

import HomepageContent from '@/components/home/HomepageContent';

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle('homepage').catch(() => notFound());

  return (
    <main className={styles.main}>
      <HomepageContent page={page} />
    </main>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle('homepage').catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? '' }]
    }
  };
}
