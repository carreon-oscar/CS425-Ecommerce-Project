'use client';

import { useShoppingCart } from 'use-shopping-cart';
import { urlFor } from '../lib/santiy';
import { ProductStripe } from '../interface';

export default function AddToBag({
  name,
  description,
  price,
  currency,
  image,
  price_id,
}: ProductStripe) {
  const { addItem, handleCartClick } = useShoppingCart();

  // product must follow the shape specified by useshoppingcart for addItem()
  const product = {
    name: name,
    description: description,
    price: price,
    currency: currency,
    image: urlFor(image).url(),
    price_id: price_id,
  };

  function handleBagClick() {
    addItem(product);
    handleCartClick();
  }

  return (
    <button
      onClick={() => handleBagClick()}
      className="bg-stone-800 text-slate-100 rounded-2xl py-2 mt-2 w-full hover:opacity-75 transition-opacity mb-2"
    >
      Add to Bag
    </button>
  );
}
