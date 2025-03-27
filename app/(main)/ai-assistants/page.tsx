import React from "react";

function AIAssistants() {
  return (
    <>
      <div className="px-10 mt-15 md:px-16 lg:px-22 xl:px-34">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">
              Welcome to the World of AI Agents 🤖
            </h2>
            <p className="text-lg mt-2 text-slate-600">
              Find the Perfect AI Partner to Enhance Your Productivity. 🚀💻
            </p>
          </div>
          <div className="relative inline-flex items-center justify-center gap-4 group">
            <div className="absolute inset-0 duration-1000 opacity-60 transitiona-all bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"></div>
            <a
              href="#"
              title="payment"
              className="group relative inline-flex items-center justify-center text-base rounded-md bg-gray-900 px-8 py-3 font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30"
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
      </div>
    </>
  );
}

export default AIAssistants;
