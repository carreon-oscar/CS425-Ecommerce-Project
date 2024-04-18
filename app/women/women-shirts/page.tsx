import CategoryPage from '../../_components/category-page-women';
import { Product } from '../../interface';
import { client } from '../../lib/santiy';
async function getData() {
  // get women's shirts
  const query = `*[_type == "product" && category->name == "Women" && subcategory->name == "Shirts"] | order(_createdAt desc){
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
  return <CategoryPage catName="Women Shirts" data={data} />;
}
