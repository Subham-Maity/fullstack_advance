import React from "react";

import LoginForm from "@/components/auth/login/login-form";
import Dialog from "@/components/ui/modal/modal";

const Page = () => {
  //Route Name
  // login/?showDialog=y
  async function onClose() {
    "use server";
    console.log("Modal has closed");
  }

  // async function onOk() {
  //   "use server";
  //   console.log("Ok was clicked");
  // }

  return (
    <div>
      {/*<Dialog title="Example Modal" onClose={onClose} onOk={onOk}>*/}
      <Dialog
        onClose={onClose}
        bg={true}
        buttonClass="mb-2 py-1 px-2 cursor-pointer rounded border-none w-8 h-8 font-bold bg-red-600 text-white"
        bgClass="dark:bg-stone-800 bg-gray-400/25 p-4 rounded-xl"
      >
        <LoginForm />
      </Dialog>
    </div>
  );
};

export default Page;
