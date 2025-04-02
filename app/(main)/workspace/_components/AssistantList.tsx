"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/context/AuthContext";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import React, { useContext, useEffect } from "react";

function AssistantList() {
  const { user } = useContext(AuthContext);
  const convex = useConvex();
  useEffect(() => {
    user && GetUserAssistants();
  }, [user]);

  const GetUserAssistants = async () => {
    const result = await convex.query(
      api.userAiAssistants.GetAllUserAssistants,
      {
        uid: user._id,
      }
    );
    console.log(result);
  };
  return (
    <>
      <div className="p-5 bg-secondary border-r-[1px] h-screen">
        <h2 className="font-bold text-lg text-center text-slate-800">
          Your Personal AI Assistants
        </h2>
        <Button className="cursor-pointer w-full mt-2 rounded-sm bg-slate-900 p-5 hover:bg-slate-800">
          + Add New AI Agent
        </Button>
        <Input className="bg-white mt-3 rounded-sm p-5" placeholder="Search" />
      </div>
    </>
  );
}

export default AssistantList;
