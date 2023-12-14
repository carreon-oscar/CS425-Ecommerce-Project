'use client';

import Image from 'next/image';
import { useState } from 'react';
import { urlFor } from '../lib/santiy';
import { ImageList } from '../interface';

export default function ImageGallery({ images }: ImageList) {
  const [mainImage, setMainImage] = useState(images[0]);

  function handleImageHover(image: any) {
    setMainImage(image);
  }

  return (
    <div className="flex">
      <div className="grid gap-y-2 self-start mr-1">
        {images.map((image: any, idx: number) => (
          <div
            key={idx}
            className="h-[60px] w-[60px] overflow-hidden rounded-lg"
          >
            <Image
              src={urlFor(image).url()}
              width={200}
              height={200}
              alt="Alternate Product Image"
              className="h-full w-full object-cover object-center cursor-pointer hover:opacity-75"
              onMouseOver={() => handleImageHover(image)}
            />
          </div>
        ))}
      </div>
      <div className="overflow-hidden rounded-lg">
        <Image
          src={urlFor(mainImage).url()}
          alt="Main Product Image"
          width={500}
          height={500}
          className="h-full w-full object-cover object-center"
        />
      </div>
    </div>
  );
}
