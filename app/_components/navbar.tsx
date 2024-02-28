'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IoBagOutline, IoSearchOutline } from 'react-icons/io5';
import { useShoppingCart } from 'use-shopping-cart';
import { CatToRender } from '../interface';
import CategoryLink from './category-link';
import Dropdown from './nav-dropdown';

//all icons are provided by react icons library
export default function Navbar() {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const [catToRender, setCatToRender] = useState({
    men: false,
    women: false,
    featured: false,
  });
  const { handleCartClick } = useShoppingCart();

  function hasCatChanged(currentCat: CatToRender, selectedCat: CatToRender) {
    for (let key in currentCat) {
      if (
        currentCat[key as keyof CatToRender] !==
        selectedCat[key as keyof CatToRender]
      ) {
        return true; // Value has changed
      }
    }
    return false; // Value has not changed}
  }

  function handleDropDownOpen(selectedCat: CatToRender) {
    if (isDropDownVisible) {
      //prevent rerender of currently selected category if user mouses back over the same category
      if (hasCatChanged(catToRender, selectedCat))
        setCatToRender(() => selectedCat);
    } else {
      setIsDropDownVisible(true);
      setCatToRender(() => selectedCat);
    }
  }

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
          <CategoryLink
            linkTitle="Featured"
            linkRef="/featured"
            callback={() =>
              handleDropDownOpen({
                men: false,
                women: false,
                featured: true,
              })
            }
          />
          <CategoryLink
            linkTitle="Men"
            linkRef="/men"
            callback={() =>
              handleDropDownOpen({
                men: true,
                women: false,
                featured: false,
              })
            }
          />
          <CategoryLink
            linkTitle="Women"
            linkRef="/women"
            callback={() =>
              handleDropDownOpen({
                men: false,
                women: true,
                featured: false,
              })
            }
          />
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
