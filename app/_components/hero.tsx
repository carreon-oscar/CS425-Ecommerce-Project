import Image from 'next/image';
import { client, urlFor } from '../lib/santiy';

async function getData() {
  const query = "*[_type == 'heroBanner'][0]";

  const data = await client.fetch(query);

  return data;
}

export default async function Hero() {
  const data = await getData();

  return (
    <section className="mx-auto max-w-2xl lg:max-w-7xl">
      <Image
        src={urlFor(data.image).url()}
        alt="Banner Image"
        className="w-full h-[700px] object-cover object-center"
        width={1000}
        height={1000}
      />
    </section>
  );
}
