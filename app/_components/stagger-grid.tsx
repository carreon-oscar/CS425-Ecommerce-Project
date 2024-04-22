'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FeauturedProduct } from '../interface';
import { client } from '../lib/santiy';
import { staggerVariants } from '../variants';

export default function StaggerGrid({ query }: { query: string }) {
  const [images, setImages] = useState<FeauturedProduct[] | null>(null);

  useEffect(() => {
    (async () => {
      const data: FeauturedProduct[] = await client.fetch(query);
      setImages(data);
    })();
  }, []);

  return (
    <div className="mx-auto max-w-2xl lg:max-w-7xl mt-7 mb-20">
      <div className="flex justify-center text-3xl">New Styles</div>
      {images && (
        <motion.ul
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerVariants}
          className="flex justify-between"
        >
          {images.map((image) => (
            <motion.li
              variants={staggerVariants}
              className="bg-purple-500 w-[300px] h-[300px]"
              key={image._id}
            >
              <Link href={`/product/${image.slug}`}>
                <div>
                  <Image
                    src={image.imageUrl}
                    alt={image.name}
                    height={300}
                    width={300}
                    className="h-[300px] w-[300px] group-hover:opacity-75 group-hover:cursor-pointer shadow-md object-cover"
                  />
                  <p className="text-sm line-clamp-2">{image.name}</p>
                  <div className="text-sm font-semibold">${image.price}</div>
                </div>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}
