import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../../interface';
import { client } from '../../lib/santiy';

const whileInViewVariants = {
  hidden: {
    opacity: 0,
    x: -10,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

async function getData() {
  const query = `*[_type == "product"][0...4] | order(_createdAt desc){
    _id,
      price,
      name,
      "slug": slug.current,
      "categoryName": category->name,
      "imageUrl": images[0].asset->url
  }`;

  const data = await client.fetch(query);

  return data;
}

export default async function FeaturedGrid() {
  const data: Product[] = await getData();
  return (
    <div className="mx-auto max-w-2xl lg:max-w-7xl grid grid-cols-1 gap-x-2 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4">
      {data.map((product) => (
        <div key={product._id} className="group relative">
          <Link href={`/product/${product.slug}`}>
            <div className="w-full group-hover:opacity-75 group-hover:cursor-pointer lg:h-80">
              <Image
                src={product.imageUrl}
                alt="Product Image"
                className="w-full h-full object-cover object-center"
                width={300}
                height={300}
              />
            </div>
            <div className="mt-2">
              <h3 className="text-sm font-medium">{product.name}</h3>
              <h4 className="text-xs text-gray-700">${product.price}</h4>
            </div>
          </Link>
        </div>
      ))}
      {data
        .map((product) => (
          <div key={product._id} className="group relative">
            <Link href={`/product/${product.slug}`}>
              <div className="w-full group-hover:opacity-75 group-hover:cursor-pointer lg:h-80">
                <Image
                  src={product.imageUrl}
                  alt="Product Image"
                  className="w-full h-full object-cover object-center"
                  width={300}
                  height={300}
                />
              </div>
              <div className="mt-2">
                <h3 className="text-sm font-medium">{product.name}</h3>
                <h4 className="text-xs text-gray-700">${product.price}</h4>
              </div>
            </Link>
          </div>
        ))
        .reverse()}
    </div>
  );
}
