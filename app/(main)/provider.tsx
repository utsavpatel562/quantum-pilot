"use client";
import React, { useEffect } from "react";
import Header from "./_components/Header";
import { GetAuthUserData } from "@/services/GlobalApi";
import { useRouter } from "next/navigation";

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  useEffect(() => {
    CheckUserAuth();
  }, []);
  const CheckUserAuth = async () => {
    const token = localStorage.getItem("user_token");
    // Get New Access Token
    const user = token && (await GetAuthUserData(token));
    if (!user?.email) {
      router.replace("sign-in");
      return;
    }
    // Get User Info from Database
    try {
    } catch (e) {}
  };
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default Provider;
