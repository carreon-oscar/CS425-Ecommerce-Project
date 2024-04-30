'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { DropdownLinks } from '../interface';
import { bgVariants, contentVariants, dropVariants } from '../variants';
import CategoryLink from './category-link';

const categories: {
  men: React.ReactElement[][];
  women: React.ReactElement[][];
  featured: React.ReactElement[][];
} = {
  men: [
    [
      <Link href="/men/men-shirts" key="/men/men-shirts">
        Shirts
      </Link>,
      <Link href="/men/men-t-shirts" key="/men/men-t-shirts">
        T-Shirts
      </Link>,
    ],
    [
      <Link href="/men/men-jeans" key="/men/men-jeans">
        Jeans
      </Link>,
    ],
    [
      <Link href="/men/men-shoes" key="/men/men-shoes">
        Shoes
      </Link>,
    ],
  ],
  women: [
    [
      <Link href="/women/women-shirts" key="/women/women-shirts">
        Shirts
      </Link>,
      <Link href="/women/women-t-shirts" key="/women/women-t-shirts">
        T-Shirts
      </Link>,
      <Link href="/women/women-shirts" key="/women/women-kurtas">
        Kurtas
      </Link>,
    ],
    [
      <Link href="#" key="/women/women-jeans">
        Jeans
      </Link>,
    ],
    [
      <Link href="/women/women-shoes" key="/women/women-shoes">
        Shoes
      </Link>,
    ],
  ],
  featured: [
    [
      <Link href="/men/men-shirts" key="/men/men-shirts">
        Shirts
      </Link>,
      <Link href="/men/men-t-shirts" key="/men/men-t-shirts">
        T-Shirts
      </Link>,
    ],
    [
      <Link href="/men/men-jeans" key="/men/men-jeans">
        Jeans
      </Link>,
    ],
    [
      <Link href="/men/men-shoes" key="/men/men-shoes">
        Shoes
      </Link>,
    ],
  ],
};

export default function NavLinks() {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const [currentCat, setCurrentCat] = useState('');

  useEffect(() => {
    if (isDropDownVisible) {
    }
  });

  function hasCatChanged(currentCat: string, selectedCat: string) {
    if (currentCat !== selectedCat) {
      return true;
    }
    return false;
  }

  function handleDropDownOpen(selectedCat: string) {
    if (isDropDownVisible) {
      //prevent rerender of currently selected category if user mouses back over the same category
      if (hasCatChanged(currentCat, selectedCat)) setCurrentCat(selectedCat);
    } else {
      setIsDropDownVisible(true);
      setCurrentCat(selectedCat);
    }
  }

  function handleDropdownExit(isVisible: boolean) {
    setIsDropDownVisible(isVisible);
    setCurrentCat('');
  }
  return (
    <nav onMouseLeave={() => handleDropdownExit(false)}>
      <CategoryLink
        linkTitle="Featured"
        linkRef="/featured"
        handleDropDownExit={handleDropdownExit}
        handleDropDownOpen={() => handleDropDownOpen('featured')}
      />
      <CategoryLink
        linkTitle="Men"
        linkRef="/men"
        handleDropDownExit={handleDropdownExit}
        handleDropDownOpen={() => {
          handleDropDownOpen('men');
        }}
      />
      <CategoryLink
        linkTitle="Women"
        linkRef="/women"
        handleDropDownExit={handleDropdownExit}
        handleDropDownOpen={() => handleDropDownOpen('women')}
      />
      <Dropdown
        currentCat={currentCat}
        handleDropdownExit={handleDropdownExit}
        isDropDownVisible={isDropDownVisible}
      />
    </nav>
  );
}

function Dropdown({
  currentCat,
  handleDropdownExit,
  isDropDownVisible,
}: DropdownLinks) {
  //this state is used to update the categories being rendered.
  //the catToRender dependency will cause the animation key to update and cause
  //framer to perform an animation when mousing over different categories.
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // disable the dropdown
        handleDropdownExit(false);
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  return (
    <AnimatePresence>
      {isDropDownVisible && (
        <>
          <motion.div
            key="dropdown"
            className="absolute bottom-0 left-0 right-0 translate-y-full bg-white text-white shadow-md z-20"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={dropVariants}
            layout="position"
          >
            <Category currentCat={currentCat} />
          </motion.div>
          <motion.div
            key="backdrop"
            onMouseEnter={() => {
              // disable the dropdown
              handleDropdownExit(false);
            }}
            className="fixed top-0 left-0 right-0 bottom-0 translate-y-[48px] bg-black z-10"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={bgVariants}
          ></motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Category({ currentCat }: { currentCat: string }) {
  let category: React.ReactElement[][] = [];
  if (currentCat === 'men') {
    category = categories.men;
  } else if (currentCat === 'women') {
    category = categories.women;
  } else if (currentCat === 'featured') {
    category = categories.featured;
  }

  const headers = [
    // eslint-disable-next-line react/jsx-key
    <div className="text-black font-semibold mb-1">Tops</div>,
    // eslint-disable-next-line react/jsx-key
    <div className="text-black font-semibold mb-1">Bottoms</div>,
    // eslint-disable-next-line react/jsx-key
    <div className="text-black font-semibold mb-1">Shoes</div>,
  ];

  return (
    <div className="max-w-5xl mx-auto p-7">
      <motion.div
        key={currentCat}
        variants={contentVariants}
        className="flex justify-between w-[50%] mx-auto"
      >
        {category.map((categoryRow, index) => (
          <div className="flex flex-col" key={`row-${index}`}>
            {headers[index]}
            {categoryRow.map((categoryItem, subIndex) => (
              <div
                key={`col-${subIndex}`}
                className="text-gray-700 hover:text-black hover:font-medium"
              >
                {categoryItem}
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
