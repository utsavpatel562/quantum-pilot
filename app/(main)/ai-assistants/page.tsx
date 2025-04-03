"use client";
import { BlurFade } from "@/components/magicui/blur-fade";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { Checkbox } from "@/components/ui/checkbox";
import { AuthContext } from "@/context/AuthContext";
import { api } from "@/convex/_generated/api";
import AiAssistantsList from "@/services/AiAssistantsList";
import { useConvex, useMutation } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";

// import attributes of Assistant from AiAssistantsList
export type ASSISTANT = {
  id: number;
  name: string;
  title: string;
  image: string;
  instruction: string;
  userInstruction: string;
  sampleQuestions: string[];
};

function AIAssistants() {
  const [selectedAssistant, setSelectedAssistant] = useState<ASSISTANT[]>([]);
  const insertAssistant = useMutation(
    api.userAiAssistants.InsertSelectAssistants
  );
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const convex = useConvex();
  const router = useRouter();

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
    if (result.length > 0) {
      // Navigate to new screen
      router.push("/workspace");
      return;
    }
  };

  // for selecting multiple assistants and inserting them into the user's AI Assistants list
  const onSelect = (assistant: ASSISTANT) => {
    const isAlreadySelected = selectedAssistant.some(
      (item) => item.id === assistant.id
    );
    if (isAlreadySelected) {
      setSelectedAssistant(
        selectedAssistant.filter((item) => item.id !== assistant.id)
      );
    } else {
      setSelectedAssistant((prev) => [...prev, assistant]);
    }
  };

  const isAssistantSelected = (assistant: ASSISTANT) => {
    return selectedAssistant.some((item) => item.id === assistant.id);
  };

  const OnClickContinue = async () => {
    setLoading(true);
    const result = await insertAssistant({
      records: selectedAssistant,
      uid: user?._id,
    });
    setLoading(false);
    console.log(result);

    // Refresh the page
    window.location.reload();

    // Redirect after a short delay to allow refresh
    setTimeout(() => {
      router.push("/workspace");
    }, 100);
  };

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="px-6 mt-10 md:px-16 lg:px-22 xl:px-34">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div className="mb-6 md:mb-0">
          <BlurFade delay={0.25} inView>
            <h2 className="text-3xl md:text-3xl font-bold text-slate-800 dark:text-slate-300">
              Welcome to the World of AI Agents 🤖
            </h2>
          </BlurFade>
          <BlurFade delay={0.25 * 2} inView>
            <p className="text-base md:text-lg mt-2 text-slate-600 dark:text-slate-400">
              Find the Perfect AI Partner to Enhance Your Productivity. 🚀💻
            </p>
          </BlurFade>
        </div>
        <RainbowButton
          onClick={OnClickContinue}
          className={`flex items-center gap-2 bg-slate-800 rounded-md shadow-2xl dark:bg-sky-200 ${
            selectedAssistant?.length === 0 ? "cursor-wait opacity-50" : ""
          }`}
          disabled={selectedAssistant?.length == 0 || loading}
        >
          Continue {loading && <FiLoader className="animate-spin" />}
          <FaArrowRight className="w-3 h-3" />
        </RainbowButton>
      </div>

      {/* View Mode Toggle (Visible Only on Mobile) */}
      <div className="flex justify-center mt-6 md:hidden">
        <button
          onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
          className="text-slate-800 border border-slate-700 dark:bg-sky-100 px-4 py-2 rounded-sm transition-all hover:bg-gray-800"
        >
          {viewMode === "grid"
            ? "Switch to List View 🔃"
            : "Switch to Grid View 🔁"}
        </button>
      </div>

      {/* AI Assistants Grid/List */}
      <div
        className={`mt-10 gap-5 md:mb-10  ${
          viewMode === "grid"
            ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            : "flex flex-col space-y-5"
        }`}
      >
        {AiAssistantsList.map((assistant, index) => (
          <BlurFade key={assistant.image} delay={0.25 + index * 0.05} inView>
            <div
              key={assistant.id}
              className="relative hover:border border-zinc-300 p-3 rounded-xl hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer hover:shadow-lg"
              onClick={() => onSelect(assistant)}
            >
              <Checkbox
                className="absolute top-5 rounded-full left-5 border-2 dark:border-zinc-500"
                checked={isAssistantSelected(assistant)}
                onCheckedChange={() => onSelect(assistant)} // Fix checkbox toggle
              />
              <Image
                src={assistant.image}
                alt={assistant.title}
                height={600}
                width={600}
                className="rounded-xl w-full h-[200px] object-cover border border-gray-300 shadow-md transition-opacity opacity-0 duration-700"
                onLoad={(e) => (e.currentTarget.style.opacity = "1")}
                style={{
                  background:
                    "linear-gradient(to top, #6a85b6 0%, #bac8e0 100%)",
                }}
              />
              <h2 className="text-center font-bold text-lg">
                {assistant.name}
              </h2>
              <h2 className="text-center text-gray-600 dark:text-gray-300">
                {assistant.title}
              </h2>
            </div>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}

export default AIAssistants;
