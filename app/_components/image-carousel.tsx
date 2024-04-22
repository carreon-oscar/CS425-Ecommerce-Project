'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Swiper as SwiperRef } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FeauturedProduct, Product } from '../interface';
import { client } from '../lib/santiy';

export default function ImageCarousel({
  query,
  cta,
  href,
}: {
  query: string;
  cta: string;
  href: string;
}) {
  const [images, setImages] = useState<FeauturedProduct[] | null>(null);
  const [controlledSwiper, setControlledSwiper] = useState<SwiperRef | null>(
    null
  );
  useEffect(() => {
    (async () => {
      const data: FeauturedProduct[] = await client.fetch(query);
      setImages(data);
    })();
  }, []);

  return (
    <div className="my-6">
      <div className="mx-auto max-w-2xl lg:max-w-7xl">
        <div className="flex justify-between items-center mb-1">
          <Link
            href={href}
            className="text-lg border border-stone-800 py-1 px-3 hover:bg-gray-200"
          >
            {cta}
          </Link>
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
        </div>

        {images && (
          <Swiper
            scrollbar={true}
            onSwiper={setControlledSwiper}
            modules={[Navigation, Scrollbar]}
            allowTouchMove={false}
            slidesPerView={5}
            slidesPerGroup={3}
            spaceBetween={10}
            speed={400}
            style={
              {
                paddingBottom: '20px',
              } as React.CSSProperties
            }
          >
            {images.map((image) => (
              <SwiperSlide key={image._id}>
                <div className="mb-1">
                  <Link
                    href={`/product/${image.slug}`}
                    className="h-full w-full group"
                  >
                    <Image
                      src={image.imageUrl}
                      alt={image.name}
                      height={300}
                      width={300}
                      className="h-[300px] w-[300px] group-hover:opacity-75 group-hover:cursor-pointer shadow-md object-cover"
                    />
                    <p className="text-sm line-clamp-2">{image.name}</p>
                    <div className="text-sm font-semibold">${image.price}</div>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}
