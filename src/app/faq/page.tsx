import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { asImageSrc } from '@prismicio/client';

import { createClient } from '@/prismicio';

import FAQContent from '@/components/faq/FAQContent';

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle('faq').catch(() => notFound());
  const faqItems = await client.getAllByType('faq_item');

  return <FAQContent page={page} faqItems={faqItems} />;
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle('faq').catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? '' }]
    }
  };
}
