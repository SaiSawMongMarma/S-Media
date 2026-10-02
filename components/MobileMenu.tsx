// Done
"use client";

import Link from "next/link";
import { useState } from "react";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const profileUsername = user?.username || user?.id;
  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        className="flex flex-col gap-[4.5px] cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div
          className={`w-6 h-1 bg-blue-500 rounded-sm ${
            isOpen ? "rotate-45" : ""
          } origin-left ease-in-out duration-500`}
        />
        <div
          className={`w-6 h-1 bg-blue-500 rounded-sm ${
            isOpen ? "opacity-0" : ""
          } ease-in-out duration-500`}
        />
        <div
          className={`w-6 h-1 bg-blue-500 rounded-sm ${
            isOpen ? "-rotate-45" : ""
          } origin-left ease-in-out duration-500`}
        />
      </button>
      {isOpen && (
        <div className="absolute left-0 top-16 w-full min-h-[calc(100vh-4rem)] bg-white flex flex-col items-center justify-center gap-6 font-medium text-lg z-10 shadow-lg">
          <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          {profileUsername && <Link href={`/profile/${profileUsername}`} onClick={() => setIsOpen(false)}>My Profile</Link>}
          <Link href="/settings" onClick={() => setIsOpen(false)}>Settings</Link>
          {user ? <SignOutButton><button type="button" onClick={() => setIsOpen(false)}>Logout</button></SignOutButton> : <SignInButton><button type="button" onClick={() => setIsOpen(false)}>Login</button></SignInButton>}
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
