'use client';

import { CheckCheck } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useShoppingCart } from 'use-shopping-cart';

//icons provided by lucide icon library
export default function StripeSuccess() {
  const [count, setCount] = useState(5);
  const router = useRouter();
  const timerID = useRef<NodeJS.Timeout>();
  const { clearCart } = useShoppingCart();

  useEffect(() => {
    clearCart();
    timerID.current = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);
    return () => clearInterval(timerID.current);
  }, []);

  useEffect(() => {
    if (count === 0) {
      router.push('/');
    }
  }, [count]);

  return (
    <div className="flex flex-col justify-center items-center my-auto">
      <div className="max-w-[50vw] mx-auto">
        <CheckCheck className="text-green-600 w-16 h-16 mx-auto mb-2" />
        <div className="text-center text-2xl stone-800 font-bold">
          <h3>Payment Complete!</h3>
        </div>
        <div className="text-center">
          You will be redirected automatically in
          <span className="text-lg font-bold"> {count}</span> seconds
        </div>
        <div className="flex justify-center">
          <button className="bg-stone-800 text-slate-100 rounded-2xl py-2 px-6 hover:opacity-75 transition-opacity mt-4">
            <Link href="/">Go Home Now</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
