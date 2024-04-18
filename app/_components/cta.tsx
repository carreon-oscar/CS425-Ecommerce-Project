import Link from 'next/link';

export default function CTA() {
  return (
    <div className="mx-auto max-w-2xl lg:max-w-7xl flex justify-center my-8">
      <div className="flex flex-col">
        <span className="text-lg">
          Checkout our sweet collection of T-Shirts.
        </span>
        <div className="flex justify-center p-6">
          <Link href="men/men-t-shirts">
            <div className="bg-stone-800 text-slate-100 rounded-2xl py-1 px-4 mr-4 hover:cursor-pointer hover:opacity-80">
              Men's T-Shirts
            </div>
          </Link>
          <Link href="women/women-t-shirts">
            <div className="bg-stone-800 text-slate-100 rounded-2xl py-1 px-4 hover:cursor-pointer hover:opacity-80">
              Women's T-Shirts
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
