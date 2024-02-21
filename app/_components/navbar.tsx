'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { IoBagOutline, IoSearchOutline } from 'react-icons/io5';
import { useShoppingCart } from 'use-shopping-cart';

// Framer Motion Variants (currently not used)
const borderVariants = {
  initial: {
    borderBottomWidth: '0%',
  },
  hover: {
    borderBottomWidth: '100%',
    transition: {
      duration: 0.5,
    },
  },
};

//all icons are provided by react icons library
export default function Navbar() {
  const [isDropDownVisible, setisDropDownVisible] = useState(false);
  const { handleCartClick } = useShoppingCart();
  return (
    <header className="py-2 relative">
      <div className="flex justify-between items-center mx-auto max-w-2xl lg:max-w-7xl">
        <Link href="/">
          <h1 className="text-2xl font-bold hover:opacity-60">Agent</h1>
        </Link>
        <div
          className="flex gap-x-5"
          onMouseEnter={() => {
            console.log(isDropDownVisible);
            setisDropDownVisible(!isDropDownVisible);
          }}
        >
          <Link href="/featured">
            <span className="text-lg link-underline link-underline-black">
              Featured
            </span>
          </Link>
          <Link href="/men">
            <span className="text-lg link-underline link-underline-black">
              Men
            </span>
          </Link>
          <Link href="/women">
            <span className="text-lg link-underline link-underline-black">
              Women
            </span>
          </Link>
        </div>
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
      {isDropDownVisible && (
        <motion.div className="absolute bottom-0 text-white left-0 bg-black w-screen translate-y-full p-7 z-[2]">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between w-[50%] mx-auto">
              <div className="flex flex-col">
                <div>Category</div>
                <div>Category</div>
              </div>
              <div className="flex flex-col">
                <div>Category</div>
                <div>Category</div>
              </div>
              <div className="flex flex-col">
                <div>Category</div>
                <div>Category</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
