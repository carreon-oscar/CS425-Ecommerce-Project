'use client';
import { motion } from 'framer-motion';
import { Product } from '../interface';
import { useEffect, useState } from 'react';
import { client } from '../lib/santiy';
import Link from 'next/link';
import Image from 'next/image';

const staggerVariants = {
  initial: {
    opacity: 0,
    x: -20,
  },
  animate: {
    type: 'tween',
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.1,
      ease: 'easeInOut',
      duration: 0.75,
    },
  },
};

export default function StagerGrid({ query }: { query: string }) {
  const [images, setImages] = useState<Product[] | null>(null);

  useEffect(() => {
    (async () => {
      const data = await client.fetch(query);
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
