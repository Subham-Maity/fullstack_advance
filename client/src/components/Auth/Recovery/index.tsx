"use client";
import React, { useEffect } from "react";
import avatar from "../../../../public/profile.png";
import styles from "./Recovery.module.css";
//Image and Link
import Link from "next/link";
import Image from "next/image";
//Router
import { useRouter } from "next/navigation";
//Formik
import { useFormik } from "formik";
//Validation
import { usernameValidate } from "@/validation/formik/validate/username";
import { INITIAL_FORM_STATE_USERNAME } from "@/validation/formik/intialValues/username";
import { Values } from "@/types/validation/validation";
//Toaster
import { Toaster } from "react-hot-toast";

const Username = () => {
  const router = useRouter();
  // const setUsername = useAuthStore((state: any) => state.setUsername);

  const formik = useFormik({
    initialValues: INITIAL_FORM_STATE_USERNAME,
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values: Values) => {
      console.log(values);
    },
  });
  return (
    <div className="container mx-auto ">
      <Toaster
        toastOptions={{
          error: {
            style: {
              background: "#212b36",
              color: "#fff",
            },
          },
        }}
        position="top-right"
        reverseOrder={false}
      ></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass} style={{ width: "10%" }}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Recovery</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter OTP to recover password.
            </span>
          </div>

          <form className="pt-20" onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <div className="input text-center">
                <span className="py-4 text-sm text-left text-gray-500">
                  Enter 6 digit OTP sent to your email address.
                </span>
                <input
                  className={styles.textbox}
                  type="text"
                  placeholder="OTP"
                />
              </div>

              <button className={styles.btn} type="submit">
                Recover
              </button>
            </div>
          </form>
          <div className="text-center py-4">
            <span className="text-gray-500">
              Can&apos;t get OTP?{" "}
              <button className="text-red-500">Resend</button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Username;
