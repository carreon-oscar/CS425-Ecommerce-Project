'use client';

import { useShoppingCart } from 'use-shopping-cart';
import { ProductStripe } from '../interface';
import { urlFor } from '../lib/santiy';
// import { CartActions } from 'use-shopping-cart';

export default function AddToBag({
  name,
  description,
  price,
  currency,
  image,
  price_id,
}: ProductStripe) {
  const { addItem, handleCartClick, cartDetails } = useShoppingCart();

  // product must follow the shape specified by useshoppingcart for addItem()
  const product = {
    name: name,
    description: description,
    id: price_id,
    price: price,
    currency: currency,
    image: urlFor(image).url(),
    price_id: price_id,
  };

  function handleBagClick() {
    //if product with id is not defined (not present in the cart) add it
    if (
      cartDetails?.[product.id] === undefined ||
      cartDetails[product.id].quantity < 10
    ) {
      addItem(product);
      handleCartClick();
    } else {
      alert('cant add more product');
    }
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
