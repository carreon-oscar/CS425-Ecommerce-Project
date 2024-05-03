'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { IoBagOutline, IoSearchOutline } from 'react-icons/io5';
import { useShoppingCart } from 'use-shopping-cart';
import NavLinks from './nav-dropdown';
import YellowAlert from './yellow-alert';
import { alertVariants } from '../variants';

import { handleRequest } from '@/utils/auth-helpers/client';
import { SignOut } from '@/utils/auth-helpers/server';
import s from './Navbar.module.css';
import { getRedirectMethod } from '@/utils/auth-helpers/settings';

interface NavbarProps {
  user?: any;
}

export default function Navbar({ user }: NavbarProps) {
  const { handleCartClick } = useShoppingCart();
  const [showAlert, setShowAlert] = useState(false);
  const pathname = usePathname();
  //const [user, setUser] = useState(null);
  const redirectMethod = getRedirectMethod();
  const router = redirectMethod === 'client' ? useRouter() : null;

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  // useEffect(() => {
  //   async function fetchUserData() {
  //     const res = await fetch('/signin/api', {
  //   method: 'POST',
  // })
  //     const user = await res.json();
  //     setUser(user);
  //     console.log("user auth", user);
  //   }

  //   fetchUserData();
  // }, [])

  return (
    <>
      <header className="py-2 relative">
        <div className="flex justify-between items-center mx-auto max-w-2xl lg:max-w-7xl">
          <Link href="/">
            <h1 className="text-2xl font-bold hover:opacity-60">Agent</h1>
          </Link>
          <NavLinks />
          <div className="flex gap-x-5 items-center">
          <div className="flex justify-end space-x-8">
            {user ? (
              <form onSubmit={(e) => handleRequest(e, SignOut, router)}>
                <input type="hidden" name="pathName" value={usePathname()} />
                <button type="submit">
                  Sign out
                </button>
              </form>
              ) : (
              <Link href="/signin">
                Sign In
              </Link>
            )}
          </div>
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
