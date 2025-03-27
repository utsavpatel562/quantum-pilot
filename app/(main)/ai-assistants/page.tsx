import AiAssistantsList from "@/services/AiAssistantsList";
import Image from "next/image";
import React from "react";

function AIAssistants() {
  return (
    <div className="px-6 mt-10 md:px-16 lg:px-22 xl:px-34">
      <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div className="mb-6 md:mb-0">
          <h2 className="text-3xl md:text-3xl font-bold text-slate-800">
            Welcome to the World of AI Agents 🤖
          </h2>
          <p className="text-base md:text-lg mt-2 text-slate-600">
            Find the Perfect AI Partner to Enhance Your Productivity. 🚀💻
          </p>
        </div>
        <div className="relative inline-flex items-center justify-center gap-4 group">
          <div className="absolute inset-0 duration-1000 opacity-60 transition-all bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"></div>
          <a
            href="#"
            title="payment"
            className="group relative inline-flex items-center justify-center text-base rounded-md bg-gray-900 px-6 py-2 md:px-8 md:py-3 font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30"
            role="button"
          >
            Continue
            <svg
              className="mt-0.5 ml-2 -mr-1 stroke-white stroke-2"
              fill="none"
              width="10"
              height="10"
              viewBox="0 0 10 10"
              aria-hidden="true"
            >
              <path
                className="transition opacity-0 group-hover:opacity-100"
                d="M0 5h7"
              ></path>
              <path
                className="transition group-hover:translate-x-[3px]"
                d="M1 1l4 4-4 4"
              ></path>
            </svg>
          </a>
        </div>
      </div>
      {/* Fetching AI Agents */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-10">
        {AiAssistantsList.map((assistant, index) => (
          <div className="hover:border border-zinc-300 p-3 rounded-xl hover:scale-105 transition-all ease-in-out cursor-pointer">
            <Image
              src={assistant.image}
              alt={assistant.title}
              height={600}
              width={600}
              className="rounded-xl w-full h-[200px] object-cover"
              style={{
                background: "linear-gradient(to top, #6a85b6 0%, #bac8e0 100%)",
              }}
            />
            <h2 className="text-center font-bold text-lg">{assistant.name}</h2>
            <h2 className="text-center text-gray-600 dark:text-gray-300">
              {assistant.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AIAssistants;
