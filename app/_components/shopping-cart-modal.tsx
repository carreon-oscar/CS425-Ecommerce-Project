'use client';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useShoppingCart } from 'use-shopping-cart';

export default function ShoppingCartModal() {
  const {
    cartCount,
    shouldDisplayCart,
    handleCartClick,
    cartDetails,
    totalPrice,
    redirectToCheckout,
  }: {
    cartCount: number;
    shouldDisplayCart: boolean;
    handleCartClick: () => void;
    cartDetails: {};
    totalPrice: number;
    redirectToCheckout: (sessionId?: string) => Promise<any>;
  } = useShoppingCart();

  //sheet modal provided by shadcn component library
  return (
    <Sheet open={shouldDisplayCart} onOpenChange={() => handleCartClick()}>
      <SheetContent className="sm:max-w-lg w-[90vw]">
        <SheetHeader>
          <SheetTitle>Bag {cartCount > 0 && `(${cartCount})`}</SheetTitle>
        </SheetHeader>
        {cartCount === 0 && (
          <h1 className="h-full flex flex-col justify-center items-center text-lg">
            Your bag is empty
          </h1>
        )}
        {cartCount > 0 && (
          <div className="h-full flex flex-col justify-between">
            <div className="mt-8 flex-1 overflow-y-auto">
              <ul className="-my-6 divide-y divide-gray-200">
                {/* shape of product object defined in addItem() documentation */}
                {Object.values(cartDetails).map((product: any) => (
                  <ProductCard
                    key={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image as string}
                    quantity={product.quantity}
                    id={product.id}
                    docID={product.docID}
                  />
                ))}
              </ul>
            </div>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal:</p>
                <p>${totalPrice}</p>
              </div>
              <Link href="/cart-preview">
                <button
                  onClick={() => handleCartClick()}
                  className="bg-stone-800 text-slate-100 rounded-2xl py-2 mt-2 w-full hover:opacity-75 transition-opacity"
                >
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

function ProductCard({
  name,
  price,
  image,
  quantity,
  id,
  docID,
}: {
  name: string;
  price: number;
  image: string;
  quantity: number;
  id: string;
  docID: string;
}) {
  const {
    removeItem,
    setItemQuantity,
  }: {
    removeItem: (id: string) => undefined;
    setItemQuantity: (id: string, quantity: number) => undefined;
  } = useShoppingCart();
  //how many options will be displayed in the select dropdown
  //default val will be 10 or < 10 if the quantity in stock is
  const [optionRange, setOptionRange] = useState<number>(10);
  //the quantity that will be displayed in the select dropdown
  const [displayedQuantity, setDisplayedQuantity] = useState<number>(quantity);
  const firstRender = useRef(true);
  useEffect(() => {
    (async () => {
      const response = await fetch('/sanity/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'quantity',
          product: { docID: docID },
        }),
        cache: 'no-store',
      });
      const { count: inventoryQuantity }: { count: number } =
        await response.json();
      /* If the quantity on hand is <= 10, the option range
        will equal inventoryQuantity so a user cannot select more than available. 
      */
      if (inventoryQuantity <= 10 && inventoryQuantity !== -1) {
        setOptionRange(inventoryQuantity);
        /* Ensure that the displayed quantity is not greater than the 
          amount on hand. Update the quanity of product with id in the cart
          to ensure the reduced quantity is reflected in the cart state */
        if (displayedQuantity > inventoryQuantity) {
          setDisplayedQuantity(inventoryQuantity);
          setItemQuantity(id, inventoryQuantity);
        }
      }
    })();
    /* don't set displayedQuantity on the first render (it's already been initialized)
    update displayedQuantity on changes to quantity (the quantity in the cart state)
    due to the select option */
    if (!firstRender.current) {
      setDisplayedQuantity(quantity);
    } else {
      firstRender.current = false;
    }
  });

  const options = [];
  for (let value = 1; value <= optionRange; ++value)
    options.push(<option value={value}>{value}</option>);

  return (
    <li className="flex py-6">
      <div className="h-24 w-24 overflow-hidden rounded-md border border-gray-200">
        <Image
          src={image as string}
          alt="Product Image"
          width={100}
          height={100}
        />
      </div>
      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{name}</h3>
            <p>${price}</p>
          </div>
          <p className="text-sm text-gray-500">Color</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div>
            <label
              htmlFor="location"
              className="text-sm font-medium text-gray-900"
            >
              Quantity
            </label>

            <select
              onChange={(e) => {
                setItemQuantity(id, parseInt(e.target.value, 10));
              }}
              id="location"
              value={displayedQuantity}
              className="ml-2 rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 hover:cursor-pointer"
            >
              {options}
            </select>
          </div>
          <button
            onClick={() => removeItem(id)}
            className="font-medium text-stone-800 hover:text-opacity-80"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}
