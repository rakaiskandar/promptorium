"use client"

import Image from "next/image";
import Link from "next/link";
import { signOut, signIn, useSession, getProviders } from "next-auth/react"
import { useEffect, useState } from "react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false)

  useEffect(() => {
    const setUpProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    }
    
    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-4">
      <Link href="/" className="flex gap-2 flex-center">
        <span className="text-xl">🌊</span>
        <p className="logo_text">promptorium</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        <div className="flex-center mr-4">
          <Link href="/explore" className="font-semibold hover:text-primary">
            Explore
          </Link>
        </div>

        {session?.user ? (
          <div className="flex gap-2 md:gap-3">
            <button 
              type="button"
              onClick={() => signOut()}
              className="w-full black_btn"
            >
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={50}
                height={50}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  <Image 
                  src='/assets/icons/google.svg'
                  width={20}
                  height={20}
                  alt="google"
                  className="mr-1"
                  />Sign In With Google
                </button>
              ))
            }
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        <div className="flex-center mr-2">
          <Link href="/explore" className="font-semibold hover:text-primary">
            Explore
          </Link>
        </div>
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button 
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In With Google
                </button>
              ))
            }
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav