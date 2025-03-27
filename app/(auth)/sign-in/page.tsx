"use client";

import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthContext";
import { api } from "@/convex/_generated/api";
import { GetAuthUserData } from "@/services/GlobalApi";
import { useGoogleLogin } from "@react-oauth/google";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";

function SignIn() {
  const CreateUser = useMutation(api.users.CreateUser);
  const { user, setUser } = useContext(AuthContext);
  const router = useRouter();
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("user_token", tokenResponse.access_token);
      }
      const user = await GetAuthUserData(tokenResponse.access_token);

      // Save User Info
      const result = await CreateUser({
        name: user?.name,
        email: user?.email,
        picture: user?.picture,
      });
      setUser(result);
      router.replace("/ai-assistants");
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <div className="flex items-center flex-col justify-center min-h-screen p-5 bg-slate-900">
      <div
        className="flex flex-col md:flex-row w-full items-center justify-center overflow-hidden rounded-2xl border border-slate-900"
        style={{
          background: "linear-gradient(to top, #dfe9f3 0%, white 100%)",
        }}
      >
        {/* Left Section */}
        <div className="flex flex-col items-center gap-5 p-10 m-5 w-full md:w-[50%]">
          <Image src={"/onlylogo.png"} alt="Logo" width={50} height={50} />
          <h2 className="text-2xl md:text-3xl text-center">
            Sign In to{" "}
            <span className="font-bold text-zinc-600">
              Quantum Pilot & Agent
            </span>
          </h2>
          <Button
            className="cursor-pointer text-lg p-5 md:py-6 rounded-sm font-light w-full sm:w-auto flex items-center gap-2"
            onClick={() => googleLogin()}
          >
            <FcGoogle className="text-2xl" /> Sign In with Google
          </Button>

          {/* Avatar Group */}
          <div className="flex items-center justify-center md:mt-5 flex-wrap gap-2">
            {[
              "img5.png",
              "img3.png",
              "img4.png",
              "img6.png",
              "img8.png",
              "img7.png",
            ].map((src, index) => (
              <img
                key={index}
                className="border-2 p-1 bg-slate-800 border-white rounded-full h-16 w-16 object-cover"
                src={`/${src}`}
                alt=""
              />
            ))}
            <span className="flex items-center justify-center bg-slate-800 text-lg text-white font-semibold border-2 border-gray-200 rounded-full px-3 md:p-3">
              +10 AI Agents
            </span>

            <h2 className="text-lg text-center mt-5 md:mt-10 text-slate-600 font-bold md:font-bold md:text-2xl">
              Beyond Assistance – AI that Thinks Ahead.
            </h2>
          </div>
        </div>

        {/* Right Section */}
        {/* Right Section */}
        <div
          className="hidden md:flex w-full md:w-[50%] justify-center items-center h-[300px] md:h-screen"
          style={{
            background: "linear-gradient(to top, #09203f 0%, #537895 100%)",
          }}
        >
          <img
            src="/img7.png"
            className="w-[85%] max-w-[400px] md:max-w-[85%]"
          />
        </div>
      </div>
    </div>
  );
}

export default SignIn;
