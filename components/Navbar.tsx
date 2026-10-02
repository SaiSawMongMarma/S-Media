"use client";

import Link from "next/link";
import MobileMenu from "./MobileMenu";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import {
  ClerkLoaded,
  ClerkLoading,
  Show,
  SignInButton,
  SignOutButton,
  SignUpButton,
} from "@clerk/nextjs";

const Navbar = () => {
  const { user } = useUser();
  const profileUsername = user?.username || user?.id;

  return (
    <div className="h-16 md:h-20 lg:h-24 flex items-center justify-between gap-3">
      {/* LEFT */}
      <div className="flex-1 lg:w-[20%] lg:flex-none">
        <Link href="/" className="font-bold text-xl text-blue-600">
          SMedia
        </Link>
      </div>
      {/* CENTER */}
      <div className="hidden lg:flex w-[50%] text-sm items-center justify-between">
        {/* LINKS */}
        <div className="flex gap-6 text-gray-600">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/home.png"
              alt="Homepage"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span>Homepage</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/friends.png"
              alt="Friends"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span>Friends</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/stories.png"
              alt="Stories"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span>Stories</span>
          </Link>
        </div>
        <div className="hidden xl:flex p-2 bg-slate-100 items-center rounded-xl">
          <input
            type="text"
            placeholder="search..."
            className="bg-transparent outline-none"
          />
          <Image src="/search.png" alt="" width={14} height={14} />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-auto lg:w-[30%] flex items-center gap-2 sm:gap-4 xl:gap-8 justify-end">
        <ClerkLoading>
          <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" />
        </ClerkLoading>
        <ClerkLoaded>
          <header className="flex justify-end items-center gap-2 sm:gap-4 h-16">
            <Show when="signed-out">
              <SignInButton>
                  <button className="min-h-10 bg-blue-600 text-white rounded-full font-medium text-sm px-4 py-2 cursor-pointer">Login</button>
              </SignInButton>
              <SignUpButton>
                <button className="bg-purple-700 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              {profileUsername && (
                <Link href={`/profile/${profileUsername}`} aria-label="Open my profile">
                  <Image
                    src={user?.imageUrl || "/noAvatar.png"}
                    alt="My profile"
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                </Link>
              )}
              <SignOutButton>
                <button className="min-h-10 text-sm text-gray-600 hover:text-red-500">Logout</button>
              </SignOutButton>
            </Show>
          </header>
        </ClerkLoaded>
        <MobileMenu />
      </div>
      {/* <MobileMenu /> */}
    </div>
  );
};

export default Navbar;
