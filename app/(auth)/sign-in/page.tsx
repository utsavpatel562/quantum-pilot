"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { GetAuthUserData } from "@/services/GlobalApi";
import { useGoogleLogin } from "@react-oauth/google";
import { useMutation } from "convex/react";
import Image from "next/image";
import React from "react";
import { FcGoogle } from "react-icons/fc";

function SignIn() {
  const CreateUser = useMutation(api.users.CreateUser);
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      if (typeof window !== undefined) {
        localStorage.setItem("user_token", tokenResponse.access_token);
      }
      const user = await GetAuthUserData(tokenResponse.access_token);
      console.log(user);

      // Save User Info
      const result = await CreateUser({
        name: user?.name,
        email: user?.email,
        picture: user?.picture,
      });
      console.log("--", result);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  return (
    <div
      className="flex items-center flex-col justify-center h-screen p-5 md:p-0"
      style={{
        background: "linear-gradient(to top, #09203f 0%, #537895 100%)",
      }}
    >
      <div className="flex items-center flex-col gap-5 border rounded-md shadow-md p-10 bg-slate-50">
        <Image src={"/logo.svg"} alt="Logo" width={50} height={50} />
        <h2 className="text-2xl md:text-3xl text-center">
          Sign In to{" "}
          <span className="font-bold text-zinc-600">Quantum Pilot & Agent</span>
        </h2>
        <Button
          className="cursor-pointer text-lg p-5 rounded-sm md:pt-6 md:pb-6 font-light"
          onClick={() => googleLogin()}
        >
          Sign In with Google <FcGoogle />
        </Button>
      </div>
    </div>
  );
}

export default SignIn;
