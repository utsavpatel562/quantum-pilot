import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Image from "next/image";
import React from "react";

function SignIn() {
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: "Bearer <tokenResponse.access_token>" } }
      );

      console.log(userInfo);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  return (
    <div className="flex items-center flex-col justify-center h-screen">
      <div className="flex items-center flex-col gap-5 border rounded-2xl shadow-md p-10">
        <Image src={"/logo.svg"} alt="Logo" width={100} height={100} />
        <h2 className="text-2xl">Sign In to Quantum Pilot & Agent</h2>
        <Button className="cursor-pointer">Sign In with Google</Button>
      </div>
    </div>
  );
}

export default SignIn;
