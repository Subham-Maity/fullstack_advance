import React from "react";

import Form from "@/components/auth/login/Form";
import Dialog from "@/components/modal/modal";

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
      <Dialog onClose={onClose}>
        <Form />
      </Dialog>
    </div>
  );
};

export default Page;
