'use client';

import { useShoppingCart } from 'use-shopping-cart';
import { urlFor } from '../lib/santiy';
import { ProductCart } from './add-to-bag';

export default function CheckoutNow({
  name,
  description,
  price,
  currency,
  image,
  price_id,
}: ProductCart) {
  const { checkoutSingleItem } = useShoppingCart();

  function buyNow(priceId: string) {
    checkoutSingleItem(priceId);
  }

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
        buyNow(product.price_id);
      }}
      className="bg-stone-800 text-slate-100 rounded-2xl py-2 mt-2 w-full hover:opacity-75 transition-opacity mb-2"
    >
      Add to Bag
    </button>
  );
}
