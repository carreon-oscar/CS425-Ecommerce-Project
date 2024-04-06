'use client';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import Image from 'next/image';
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

  // console.log(cartDetails);

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
                  />
                ))}
              </ul>
            </div>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal:</p>
                <p>${totalPrice}</p>
              </div>
              {/* data sent using POST with a form is sent in the request body */}
              <form action="/stripe/api" method="POST">
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
                  Checkout
                </button>
              </form>
              {/* <button
                onClick={handleCheckoutClick}
                className="bg-stone-800 text-slate-100 rounded-2xl py-2 mt-2 w-full hover:opacity-75 transition-opacity"
              >
                Checkout
              </button> */}
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
}: {
  name: string;
  price: number;
  image: string;
  quantity: number;
  id: string;
}) {
  const {
    removeItem,
    setItemQuantity,
  }: {
    removeItem: (id: string) => undefined;
    setItemQuantity: (id: string, quantity: number) => undefined;
  } = useShoppingCart();

  const options = [];
  for (let quantity = 1; quantity <= 10; ++quantity)
    options.push(<option value={quantity}>{quantity}</option>);

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
              defaultValue={quantity}
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
