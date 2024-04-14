'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperRef } from 'swiper';
import { Navigation, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { client } from '../lib/santiy';
import { Product } from '../interface';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function ImageCarousel() {
  const [images, setImages] = useState<Product[] | null>(null);
  const [controlledSwiper, setControlledSwiper] = useState<SwiperRef | null>(
    null
  );
  useEffect(() => {
    console.log('hello');
    (async () => {
      const query = `*[_type == "product"][0...10] | order(_createdAt desc){
          _id,
          price,
          name,
          "slug": slug.current,
          "categoryName": category->name,
          "imageUrl": images[0].asset->url
      }`;
      const data = await client.fetch(query);
      console.log(data);
      setImages(data);
    })();
  }, []);

  return (
    <>
      <div className="mx-auto max-w-2xl lg:max-w-7xl">
        <div className="flex justify-end">
          <ChevronLeft
            onClick={() => {
              controlledSwiper!.slidePrev(400);
            }}
            size={48}
            strokeWidth={1}
            className="hover:opacity-50 hover:cursor-pointer -mr-4"
          />
          <ChevronRight
            size={48}
            strokeWidth={1}
            onClick={() => {
              controlledSwiper!.slideNext(400);
            }}
            className="hover:opacity-50 hover:cursor-pointer"
          />
        </div>

        {images && (
          <Swiper
            scrollbar={true}
            onSwiper={setControlledSwiper}
            modules={[Navigation, Scrollbar]}
            loop={true}
            allowTouchMove={false}
            slidesPerView={5}
            slidesPerGroup={5}
            spaceBetween={10}
            speed={400}
            style={{ paddingBottom: '20px' }}
          >
            {images.map((image) => (
              <SwiperSlide key={image._id}>
                <div className="relative mb-1">
                  <Link
                    href={`/product/${image.slug}`}
                    className="h-full w-full relative"
                  >
                    <Image
                      src={image.imageUrl}
                      alt={image.name}
                      height={275}
                      width={275}
                      className="h-full w-full hover:opacity-75 hover:cursor-pointer shadow-md"
                    />
                  </Link>
                </div>
                <p className="text-sm line-clamp-2">{image.name}</p>
                <div className="text-sm font-semibold">${image.price}</div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </>
  );
}
