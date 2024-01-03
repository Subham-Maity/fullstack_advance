"use client";
import React, { useEffect } from "react";
import avatar from "../../../../public/profile.png";
import styles from "./Username.module.css";
//Image and Link
import Link from "next/link";
import Image from "next/image";
//Router
import { useRouter } from "next/navigation";
//Formik
import { useFormik } from "formik";
//Validation
import { usernameValidate } from "@/validation/formik/validate";
//Toaster
import { Toaster } from "react-hot-toast";
import { INITIAL_FORM_STATE_USERNAME } from "@/validation/formik/intialValues";
import { Values } from "@/types/validation/validation";

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
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold text-whitex">JWT Auth</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              This is a demo of JWT authentication
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <Image src={avatar} className={styles.profile_img} alt="avatar" />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("username")}
                className={styles.textbox}
                type="text"
                placeholder="Username"
              />
              <button className={styles.btn} type="submit">
                Make your own
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Not a Member{" "}
                <Link className="text-red-500" href="jwt/register">
                  Register Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Username;
