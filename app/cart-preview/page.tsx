'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useShoppingCart } from 'use-shopping-cart';
export default function CartPreview() {
  const {
    cartCount,
    totalPrice,
    cartDetails,
  }: { cartCount: number; totalPrice: number; cartDetails: {} } =
    useShoppingCart();

  return (
    <>
      <div className="max-w-2xl lg:max-w-7xl w-full mx-auto mb-4">
        <div className="flex">
          <div className="grow-[3] mr-4 bg-gray-100 p-2">
            <div className="text-2xl font-semibold border-b mb-4 pb-2 border-gray-200">
              Your Bag
            </div>
            {cartCount > 0 ? (
              <ul className="-my-6 divide-y divide-gray-200">
                {/* shape of product object defined in addItem() documentation */}
                {Object.values(cartDetails).map((product: any) => (
                  <Product
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
            ) : (
              <div>There are currently no items in your bag</div>
            )}
          </div>
          <div className="grow bg-gray-200 p-4">
            <div className="text-lg">
              Subtotal ({cartCount} items):{' '}
              <span className="font-bold">${totalPrice}</span>
            </div>
            <CheckoutSubmit
              action="stripe/api"
              method="POST"
              cartDetails={cartDetails}
              title="Checkout"
            />
            <CheckoutSubmit
              action="coinbase/api"
              method="POST"
              cartDetails={cartDetails}
              title="Checkout with crypto"
            />
          </div>
        </div>
      </div>
    </>
  );
}

function CheckoutSubmit({
  action,
  method,
  cartDetails,
  title,
}: {
  action: string;
  method: string;
  cartDetails: {};
  title: string;
}) {
  {
    /* data sent using POST with a form is sent in the request body */
  }
  return (
    <form action={action} method={method}>
      <input
        type="hidden"
        name="cartDetails"
        id="data-input"
        value={JSON.stringify(cartDetails)}
      />
      <button
        type="submit"
        className="bg-stone-800 text-slate-100 rounded-2xl py-2 mt-2 w-full hover:opacity-75 transition-opacity"
      >
        {title}
      </button>
    </form>
  );
}

function Product({
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
  const { removeItem, setItemQuantity } = useShoppingCart();

  //how many options will be displayed in the select dropdown
  //default val will be 10 or < 10 if the quantity in stock is
  const [optionRange, setOptionRange] = useState<number>(11);
  //the quantity that will be displayed in the select dropdown
  const [displayedQuantity, setDisplayedQuantity] = useState<number>(quantity);
  const firstRender = useRef(true);
  useEffect(() => {
    async function checkQuantity() {
      try {
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
          /* Update the displayed quantity if its greater than the 
          amount on hand. Update the quanity of product with id in the cart
          to ensure the reduced quantity is reflected in the cart state */
          if (displayedQuantity > inventoryQuantity) {
            setDisplayedQuantity(inventoryQuantity);
            setItemQuantity(id, inventoryQuantity);
          }
        }
      } catch (error) {
        console.log('error when POST to /sanity/api: ', error);
      }
    }
    /* don't set displayedQuantity on the first render (it's already been initialized)
    update displayedQuantity on changes to quantity (the quantity in the cart state)
    due to the select option */
    if (!firstRender.current) {
      setDisplayedQuantity(quantity);
    } else {
      //on first render, we want to cross check with the inventory that's in stock
      //right away otherwise we wouldn't check for 2 seconds until the interval below is called
      checkQuantity();
      firstRender.current = false;
    }
    const interval: NodeJS.Timeout = setInterval(checkQuantity, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [quantity, displayedQuantity]);

  const options = [];
  for (let value = 1; value <= (optionRange < 11 ? optionRange : 10); ++value)
    options.push(<option value={value}>{value}</option>);
  return (
    <li key={id} className="flex justify-between py-6">
      <div className="h-40 w-40 overflow-hidden rounded-md border border-gray-200">
        <Image
          src={image as string}
          alt="Product Image"
          width={200}
          height={200}
        />
      </div>
      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{name}</h3>
            <p>${price}</p>
          </div>
          <p className="text-sm text-gray-500">Color</p>
          {optionRange > 0 && optionRange <= 10 && (
            <div className="text-red-500 text-sm">
              Only {optionRange} left in stock.
            </div>
          )}
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
              defaultValue={1}
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

export const dynamic = 'force-dynamic';
