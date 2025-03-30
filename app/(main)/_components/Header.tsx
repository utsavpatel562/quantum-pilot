"use client";
import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";
import React, { useContext } from "react";

function Header() {
  const { user } = useContext(AuthContext);

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-6 md:px-14 dark:border-b-2 dark:border-b-zinc-700 sticky top-0 z-50 bg-white dark:bg-black">
      {/* Logo */}
      <Image
        src={"/logo.png"}
        alt="logo"
        width={180}
        height={180}
        className="w-44 md:w-56" // Adjust logo size for mobile
      />

      {/* Profile Picture */}
      {user?.picture && (
        <Image
          src={user?.picture}
          alt="profile"
          width={40}
          height={40}
          className="rounded-full w-10 h-10"
        />
      )}
    </div>
  );
}

export default Header;
