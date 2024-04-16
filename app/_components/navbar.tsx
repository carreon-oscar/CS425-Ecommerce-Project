'use client';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoBagOutline, IoSearchOutline } from 'react-icons/io5';
import { useShoppingCart } from 'use-shopping-cart';
import NavLinks from './nav-dropdown';
import YellowAlert from './yellow-alert';
import { alertVariants } from '../variants';

export default function Navbar() {
  const { handleCartClick } = useShoppingCart();
  const [showAlert, setShowAlert] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <>
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
              <IoBagOutline
                onClick={() => {
                  if (pathname !== '/cart-preview') {
                    handleCartClick();
                  } else {
                    setShowAlert(true);
                  }
                }}
                size="18"
              />
            </Link>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {showAlert && (
          <motion.div
            className=""
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={alertVariants}
          >
            <div className="mx-auto max-w-2xl lg:max-w-7xl my-2">
              <YellowAlert
                header="The cart is disabled while you are in the checkout preview"
                sub=""
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
