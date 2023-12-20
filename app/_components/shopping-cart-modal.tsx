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
    removeItem,
    totalPrice,
    redirectToCheckout,
  }: {
    cartCount: number;
    shouldDisplayCart: boolean;
    handleCartClick: () => void;
    cartDetails: any;
    removeItem: any;
    totalPrice: number;
    redirectToCheckout: any;
  } = useShoppingCart();

  async function handleCheckoutClick(event: any) {
    event.preventDefault();
    try {
      const result = await redirectToCheckout();
      if (result?.error) {
        console.error(result);
      }
    } catch (error) {
      console.error('Checkout Error:', error);
    }
  }

  console.log(cartDetails);

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
                {Object.values(cartDetails).map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="h-24 w-24 overflow-hidden rounded-md border border-gray-200">
                      <Image
                        src={product.image as string}
                        alt="Product Image"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{product.name}</h3>
                          <p>${product.price}</p>
                        </div>
                        <p className="text-sm text-gray-500">Color</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div>
                          <span className="text-gray-500">
                            Quantity: {product.quantity}
                          </span>
                          <span className="text-gray-500 ml-6">Size</span>
                        </div>

                        <button
                          onClick={() => removeItem(product.id)}
                          className="font-medium text-stone-800 hover:text-opacity-80"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal:</p>
                <p>${totalPrice}</p>
              </div>

              <button
                onClick={handleCheckoutClick}
                className="bg-stone-800 text-slate-100 rounded-2xl py-2 mt-2 w-full hover:opacity-75 transition-opacity"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
