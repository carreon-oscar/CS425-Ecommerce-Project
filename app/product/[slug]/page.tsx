import AddToBag from '@/app/_components/add-to-bag';
import ImageGallery from '@/app/_components/image-gallery';
import { CompleteProduct } from '@/app/interface';
import { client } from '@/app/lib/santiy';

async function getData(slug: string) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0] {
    _id,
    images,
    price,
    name,
    description,
    "slug": slug.current,
    "categoryName": category->name,
    price_id
  }`;

  const data = await client.fetch(query);

  return data;
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const data: CompleteProduct = await getData(params.slug);

  return (
    <div>
      <div className="mx-auto max-w-screen-xl">
        <div className="flex mx-auto max-w-[80%]">
          <ImageGallery images={data.images} />
          <div className="ml-16 max-w-[25%]">
            <div className="mb-2 md:mb-3">
              <h1 className="text-2xl font-bold">{data.name}</h1>
              <h2 className="text-lg font-medium">{data.categoryName}</h2>
              <h2 className="text-lg font-medium text-red-700">
                ${data.price}
              </h2>
              <hr className="border-top border border-black my-2" />
              <h3 className="text-lg mb-2">Colors</h3>
              <div className="flex gap-x-1 mb-2">
                <div className="w-[20px] h-[20px] bg-red-300 rounded-full"></div>
                <div className="w-[20px] h-[20px] bg-blue-300 rounded-full"></div>
                <div className="w-[20px] h-[20px] bg-green-300 rounded-full"></div>
                <div className="w-[20px] h-[20px] bg-indigo-300 rounded-full"></div>
                <div className="w-[20px] h-[20px] bg-purple-300 rounded-full"></div>
              </div>
              <h3 className="text-lg">Sizes</h3>
              <div className="flex gap-x-1 my-2">
                <div className="w-[20px] h-[20px] bg-gray-100 p-4 text-[10px] text-bold text-black rounded-full flex items-center justify-center hover:opacity-75 cursor-pointer">
                  XS
                </div>
                <div className="w-[20px] h-[20px] bg-gray-100 p-4 text-[10px] text-bold text-black rounded-full flex items-center justify-center hover:opacity-75 cursor-pointer">
                  S
                </div>
                <div className="w-[20px] h-[20px] bg-gray-100 p-4 text-[10px] text-bold text-black rounded-full flex items-center justify-center hover:opacity-75 cursor-pointer">
                  M
                </div>
                <div className="w-[20px] h-[20px] bg-gray-100 p-4 text-[10px] text-bold text-black rounded-full flex items-center justify-center hover:opacity-75 cursor-pointer">
                  L
                </div>
              </div>
              <AddToBag
                currency="USD"
                description={data.description}
                image={data.images[0]}
                name={data.name}
                price={data.price}
                key={data._id}
                price_id={data.price_id}
              />
              <h3 className="text-md text-gray-500">{data.description}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
