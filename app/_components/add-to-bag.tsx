'use client';

import { useShoppingCart } from 'use-shopping-cart';
import { urlFor } from '../lib/santiy';

export interface ProductCart {
  name: string;
  description: string;
  price: number;
  currency: string;
  image: any;
  price_id: string;
}

export default function AddToBag({
  name,
  description,
  price,
  currency,
  image,
  price_id,
}: ProductCart) {
  const { addItem, handleCartClick } = useShoppingCart();

  const product = {
    name: name,
    description: description,
    price: price,
    currency: currency,
    image: urlFor(image).url(),
    price_id: price_id,
  };

  return (
    <button
      onClick={() => {
        addItem(product);
        handleCartClick();
      }}
      className="bg-stone-800 text-slate-100 rounded-2xl py-2 mt-2 w-full hover:opacity-75 transition-opacity mb-2"
    >
      Add to Bag
    </button>
  );
}
