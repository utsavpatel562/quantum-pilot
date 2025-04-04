import React from "react";
import AssistantList from "./_components/AssistantList";
import TestingUI from "./_components/TestingUI";

function WorkSpace() {
  return (
    <>
      <div className="h-screen fixed w-full">
        <div className="grid grid-cols-5">
          {/*Assistant List - Selected by User*/}
          <div className="hidden md:block">
            <AssistantList />
          </div>
          {/*Chat UI*/}
          <div className="lg:col-span-3 md:col-span-4">
            <TestingUI />
          </div>
          {/*Settings*/}
          <div className="hidden lg:block">Settings</div>
        </div>
      </div>
    </>
  );
}

export default WorkSpace;
