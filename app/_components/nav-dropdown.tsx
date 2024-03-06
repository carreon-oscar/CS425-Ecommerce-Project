'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { bgVariants, contentVariants, dropVariants } from '../variants';
import CategoryLink from './category-link';

const categories = {
  men: [
    ['Stuff 1', 'Stuff 2', 'Stuff 3'],
    ['Stuff 4', 'Stuff 5', 'Stuff 6'],
    ['Stuff 7', 'Stuff 8', 'Stuff 9'],
  ],
  women: [
    ['Stuff 44', 'Stuff 44', 'Stuff 44'],
    ['Stuff 44', 'Stuff 44', ''],
    ['Stuff 44', 'Stuff 44', 'Stuff 44'],
  ],
  featured: [
    ['Stuff 55', 'Stuff 55', 'Stuff 55'],
    ['Stuff 55', 'Stuff 55', 'Stuff 55'],
    ['Stuff 55', 'Stuff 55', 'Stuff 55'],
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
        callback={() => handleDropDownOpen('featured')}
      />
      <CategoryLink
        linkTitle="Men"
        linkRef="/men"
        callback={() => {
          handleDropDownOpen('men');
        }}
      />
      <CategoryLink
        linkTitle="Women"
        linkRef="/women"
        callback={() => handleDropDownOpen('women')}
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
}: {
  currentCat: string;
  handleDropdownExit: (state: boolean) => void;
  isDropDownVisible: boolean;
}) {
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
            className="absolute bottom-0 left-0 right-0 translate-y-full bg-white text-white z-20"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={dropVariants}
            layout
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
  let category: string[][] = [];
  if (currentCat === 'men') {
    category = categories.men;
  } else if (currentCat === 'women') {
    category = categories.women;
  } else if (currentCat === 'featured') {
    category = categories.featured;
  }

  return (
    <div className="max-w-5xl mx-auto p-7">
      <motion.div
        key={currentCat}
        variants={contentVariants}
        className="flex justify-between w-[50%] mx-auto"
      >
        {category.map((categoryRow, index) => (
          <div className="flex flex-col" key={`row-${index}`}>
            {categoryRow.map((categoryItem, subIndex) => (
              <div key={`col-${subIndex}`} className="text-black">
                {categoryItem}
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
