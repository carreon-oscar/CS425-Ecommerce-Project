import CategoryPage from '../_components/category-page';
import { Product } from '../interface';
import { client } from '../lib/santiy';
async function getData() {
  // get the 50 most recently added Men's products
  const query = `*[_type == "product" && category->name == "Men"][0...50] | order(_createdAt desc){
    _id,
      price,
      name,
      quantity,
      "slug": slug.current,
      "categoryName": category->name,
      "subcategoryName": subcategory->name,
      "imageUrl": images[0].asset->url
  }`;

  const data = await client.fetch(query);

  return data;
}

export default async function Men() {
  const data: Product[] = await getData();
  //console log to see data stored
  //console.log(data);
  return <CategoryPage catName="Men" data={data} />;
}
