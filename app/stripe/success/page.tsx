import { CheckCheck } from 'lucide-react';
import Link from 'next/link';

//icons provided by lucide icon library
export default function StripeSuccess() {
  return (
    <div className="h-screen">
      <div className="mt-32 max-w-[50vw] mx-auto">
        <CheckCheck className="text-green-600 w-16 h-16 mx-auto my-6" />
        <div className="text-center text-2xl stone-800 font-bold">
          <h3>Payment Complete!</h3>
        </div>
        <div className="flex justify-center">
          <button className="bg-stone-800 text-slate-100 rounded-2xl py-2 px-6 hover:opacity-75 transition-opacity mt-6">
            <Link href="/">Go Home</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
