'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { IoBagOutline, IoSearchOutline } from 'react-icons/io5';
import { useShoppingCart } from 'use-shopping-cart';
import NavLinks from './nav-dropdown';

//all icons are provided by react icons library
export default function Navbar() {
  const { handleCartClick } = useShoppingCart();

  return (
    <header className="py-2 relative">
      <div className="flex justify-between items-center mx-auto max-w-2xl lg:max-w-7xl">
        <Link href="/">
          <h1 className="text-2xl font-bold hover:opacity-60">Agent</h1>
        </Link>
        <NavLinks />
        <div className="flex gap-x-5 items-center">
          <Link href="/login" className="text-lg">
            Log in
          </Link>
          <Link href="#">
            <IoSearchOutline size="18" />
          </Link>
          <Link href="#">
            <IoBagOutline onClick={() => handleCartClick()} size="18" />
          </Link>
        </div>
      </div>
    </header>
  );
}
