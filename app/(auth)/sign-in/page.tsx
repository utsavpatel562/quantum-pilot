"use client";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Image from "next/image";
import React from "react";
import { FcGoogle } from "react-icons/fc";

function SignIn() {
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: "Bearer" + tokenResponse.access_token } }
      );

      console.log(userInfo);
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
