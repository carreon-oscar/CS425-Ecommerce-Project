import FeaturedGrid from './featured-grid';
import ImageCarousel from './image-carousel';

export default function Featured() {
  return (
    <>
      <div className="mx-auto max-w-2xl lg:max-w-7xl flex justify-center m-3">
        <h1 className="text-2xl font-medium border-b-2 border-black">
          Featured Products
        </h1>
      </div>
      <FeaturedGrid />
      <ImageCarousel></ImageCarousel>
    </>
  );
}
