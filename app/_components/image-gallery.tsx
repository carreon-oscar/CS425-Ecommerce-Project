'use client';

import Image from 'next/image';
import { useState } from 'react';
import { urlFor } from '../lib/santiy';

interface ImageList {
  images: any;
}

export default function ImageGallery({ images }: ImageList) {
  const [mainImage, setMainImage] = useState(images[0]);

  function handleImageClick(image: any) {
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
              onMouseOver={() => handleImageClick(image)}
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
    // <div className="grid gap-y-4 lg:grid-cols-5">
    //   <div className="flex gap-4 lg:flex-col items-end">
    //     {images.map((image: any, idx: number) => (
    //       <div
    //         key={idx}
    //         className="h-[60px] w-[60px] overflow-hidden rounded-lg"
    //       >
    //         <Image
    //           src={urlFor(image).url()}
    //           width={200}
    //           height={200}
    //           alt="Alternate Product Image"
    //           className="h-full w-full object-cover object-center cursor-pointer"
    //           onMouseOver={() => handleImageClick(image)}
    //         />
    //       </div>
    //     ))}
    //   </div>
    //   <div className="relative overflow-hidden rounded-lg lg:col-span-4">

    //   </div>
    // </div>
  );
}
