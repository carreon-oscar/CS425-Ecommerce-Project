'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function StripeError() {
  const [count, setCount] = useState(5);
  const router = useRouter();
  const timerID = useRef<NodeJS.Timeout>();

  useEffect(() => {
    timerID.current = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);
    return () => clearInterval(timerID.current);
  }, []);

  useEffect(() => {
    if (count === 0) {
      //redirect to
      router.push('/');
    }
  }, [count]);

  return (
    <div className="flex flex-col justify-center items-center my-auto">
      <h2 className="font-semibold text-2xl">
        Payment Error, something went wrong...
      </h2>

      <div>
        You will be automatically redirected in{' '}
        <span className="text-lg font-bold"> {count}</span> seconds
      </div>
      <div className="flex justify-center">
        <button className="bg-stone-800 text-slate-100 rounded-2xl py-2 px-6 hover:opacity-75 transition-opacity mt-2">
          <Link href="/">Go Home Now</Link>
        </button>
      </div>
    </div>
  );
}
