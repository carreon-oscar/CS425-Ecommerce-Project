'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { catToRender } from '../interface';
import { bgVariants, contentVariants, dropVariants } from '../variants';

const menCategories = [
  ['Stuff 1', 'Stuff 2', 'Stuff 3'],
  ['Stuff 4', 'Stuff 5', 'Stuff 6'],
  ['Stuff 7', 'Stuff 8', 'Stuff 9'],
];

const womenCategories = [
  ['Stuff 44', 'Stuff 44', 'Stuff 44'],
  ['Stuff 44', 'Stuff 44', 'Stuff 44'],
  ['Stuff 44', 'Stuff 44', 'Stuff 44'],
];

const featuredCategories = [
  ['Stuff 55', 'Stuff 55', 'Stuff 55'],
  ['Stuff 55', 'Stuff 55', 'Stuff 55'],
  ['Stuff 55', 'Stuff 55', 'Stuff 55'],
];

export default function Dropdown({
  catToRender,
  callback,
  isDropDownVisible,
}: {
  catToRender: catToRender;
  callback: (state: boolean) => void;
  isDropDownVisible: boolean;
}) {
  //this state is used to update the categories being rendered.
  //the catToRender dependency will cause the animation key to update and cause
  //framer to perform an animation when mousing over different categories.
  const [animationKey, setAnimationKey] = useState(0);
  useEffect(() => {
    setAnimationKey(() => animationKey + 1);
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // disable the dropdown
        callback(false);
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [catToRender]);

  let categories: string[][] = [];

  if (catToRender.men) {
    categories = menCategories;
  } else if (catToRender.women) {
    categories = womenCategories;
  } else if (catToRender.featured) {
    categories = featuredCategories;
  }

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
            <div className="max-w-5xl mx-auto p-7">
              <motion.div
                key={`categories-${animationKey}`}
                className="flex justify-between w-[50%] mx-auto"
                variants={contentVariants}
              >
                {categories.map((categoryRow, index) => (
                  <div className="flex flex-col" key={index}>
                    {categoryRow.map((category, subIndex) => (
                      <div key={subIndex} className="text-black">
                        {category}
                      </div>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            key="backdrop"
            onMouseEnter={() => {
              // disable the dropdown
              callback(false);
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
