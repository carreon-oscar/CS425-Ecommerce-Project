'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IoBagOutline, IoSearchOutline } from 'react-icons/io5';
import { useShoppingCart } from 'use-shopping-cart';
import Dropdown from './nav-dropdown';

const catToRender = {
  men: false,
  women: false,
  featured: false,
};

//all icons are provided by react icons library
export default function Navbar() {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const [catToRender, setCatToRender] = useState({
    men: false,
    women: false,
    featured: false,
  });
  const { handleCartClick } = useShoppingCart();

  function handleDropdownExit(isVisible: boolean) {
    setIsDropDownVisible(isVisible);
  }

  return (
    <header className="py-2 relative">
      <div className="flex justify-between items-center mx-auto max-w-2xl lg:max-w-7xl">
        <Link href="/">
          <h1 className="text-2xl font-bold hover:opacity-60">Agent</h1>
        </Link>
        <nav
          onMouseLeave={() => {
            if (isDropDownVisible) {
              setIsDropDownVisible(false);
            }
          }}
        >
          <Link href="/featured">
            <span
              onMouseEnter={() => {
                if (isDropDownVisible) {
                  setCatToRender(() => ({
                    men: false,
                    women: false,
                    featured: true,
                  }));
                } else {
                  catToRender.featured = true;
                  setIsDropDownVisible(true);
                }
              }}
              className="text-lg link-underline link-underline-black p-3"
            >
              Featured
            </span>
          </Link>
          <Link href="/men">
            <span
              onMouseEnter={() => {
                if (isDropDownVisible) {
                  setCatToRender(() => ({
                    men: true,
                    women: false,
                    featured: false,
                  }));
                } else {
                  catToRender.men = true;
                  setIsDropDownVisible(true);
                }
              }}
              className="text-lg link-underline link-underline-black p-3"
            >
              Men
            </span>
          </Link>
          <Link href="/women">
            <span
              onMouseEnter={() => {
                if (isDropDownVisible) {
                  setCatToRender(() => ({
                    men: false,
                    women: true,
                    featured: false,
                  }));
                } else {
                  catToRender.women = true;
                  setIsDropDownVisible(true);
                }
              }}
              className="text-lg link-underline link-underline-black p-3"
            >
              Women
            </span>
          </Link>
          <Dropdown
            catToRender={catToRender}
            callback={handleDropdownExit}
            isDropDownVisible={isDropDownVisible}
          />
        </nav>
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
