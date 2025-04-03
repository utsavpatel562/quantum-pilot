"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/context/AuthContext";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import React, { useContext, useEffect, useState } from "react";
import { ASSISTANT } from "../../ai-assistants/page";
import Image from "next/image";
import { AssistantContext } from "@/context/AssistantContext";

function AssistantList() {
  const { user } = useContext(AuthContext);
  const convex = useConvex();
  const [assistantList, setAssistantList] = useState<ASSISTANT[]>([]);
  const { assistant, setAssistant } = useContext(AssistantContext);
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
    setAssistantList(result);
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
        <div className="mt-5">
          {assistantList.map((assistant_, index) => (
            <div
              className={`flex p-2 gap-3 items-center hover:bg-gray-200 hover:dark:bg-slate-700 rounded-lg cursor-pointer mt-2 ${assistant_.id == assistant?.id && "bg-gray-200"}`}
              key={index}
              onClick={() => setAssistant(assistant_)}
            >
              <Image
                src={assistant_.image}
                alt={assistant_.name}
                width={60}
                height={60}
                className="object-cover border border-gray-300 shadow-md rounded-md w-[70px] h-[70px]"
                style={{
                  background:
                    "linear-gradient(to top, #6a85b6 0%, #bac8e0 100%)",
                }}
              />
              <div>
                <h2 className="font-bold">{assistant_.name}</h2>
                <h2 className="text-gray-600 dark:text-gray-400">
                  {assistant_.title}
                </h2>
              </div>
            </div>
          ))}
        </div>
        {/* Footer */}
        <div className="flex items-center gap-2 absolute bottom-20">
          <Image
            src={user?.picture}
            alt="user"
            width={35}
            height={35}
            className="rounded-full"
          />
          <div>
            <h2 className="font-bold text-md text-slate-700">{user?.name}</h2>
            <h2 className="font-semibold text-sm text-gray-400">
              {user?.orderId ? "Pro Plan" : "Free Plan"}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default AssistantList;
