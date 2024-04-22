import CTA from './cta';
import ImageCarousel from './image-carousel';
import StaggerGrid from './stagger-grid';

export default function Featured() {
  const queryMen = `*[_type == "product" && category->name == "Men"][0...10] | order(_createdAt desc){
    _id,
    price,
    name,
    "slug": slug.current,
    "categoryName": category->name,
    "imageUrl": images[0].asset->url
}`;
  const queryWomen = `*[_type == "product" && category->name == "Women"][0...10] | order(_createdAt desc){
  _id,
  price,
  name,
  "slug": slug.current,
  "categoryName": category->name,
  "imageUrl": images[0].asset->url
}`;

  const queryMenTShirt = `*[_type == "product" && category->name == "Men" && subcategory->name == "Shoes"] | order(_createdAt desc){
    _id,
    price,
    name,
    "slug": slug.current,
    "categoryName": category->name,
    "imageUrl": images[0].asset->url
  }`;
  return (
    <>
      <ImageCarousel
        query={queryMen}
        cta="Shop Men's Products"
        href="/men"
      ></ImageCarousel>
      <CTA />
      <ImageCarousel
        query={queryWomen}
        cta="Shop Women's Products"
        href="/women"
      ></ImageCarousel>
      <StaggerGrid query={queryMenTShirt}></StaggerGrid>
    </>
  );
}
