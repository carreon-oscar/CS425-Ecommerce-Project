import imageUrlBuilder from '@sanity/image-url';
import { createClient } from 'next-sanity';

//URL Builder code from sanity docs
export const client = createClient({
  projectId: '6uopnzeq',
  dataset: 'production',
  apiVersion: '2022-03-25',
  useCdn: true,
});

//client instance that can write to documents
export const writeClient = createClient({
  projectId: '6uopnzeq',
  dataset: 'production',
  apiVersion: '2022-03-25',
  useCdn: true,
  token: process.env.SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
