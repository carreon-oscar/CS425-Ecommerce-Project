import CategoryPage from '../_components/category-page';
import { Product } from '../interface';
import { client } from '../lib/santiy';
async function getData() {
  // get the 10 most most recently added Women's products
  const query = `*[_type == "product" && category->name == "Women"][0...10] | order(_createdAt desc){
    _id,
    price,
    name,
    quantity,
    "slug": slug.current,
    "categoryName": category->name,
    "imageUrl": images[0].asset->url
}`;

  const data = await client.fetch(query);

  return data;
}

export default async function Women() {
  const data: Product[] = await getData();
  return <CategoryPage catName="Women" data={data} />;
}
