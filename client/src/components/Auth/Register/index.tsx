"use client";
import React, { useEffect, useState } from "react";
import avatar from "../../../../public/profile.png";
import styles from "./Register.module.css";
//Image and Link
import Link from "next/link";
import Image from "next/image";
//Router
import { useRouter } from "next/navigation";
//Formik
import { useFormik } from "formik";
//Validation
import { registerValidate } from "@/validation/formik/validate";
//Toaster
import { Toaster } from "react-hot-toast";
import {
  INITIAL_FORM_STATE_PASSWORD,
  INITIAL_FORM_STATE_REGISTER,
  INITIAL_FORM_STATE_RESET_PASSWORD,
} from "@/validation/formik/intialValues";
import { Values } from "@/types/validation/validation";
import convertToBase64 from "@/convert";

const Register = () => {
  const router = useRouter();
  const [file, setFile] = React.useState<any>(null);

  const formik = useFormik({
    initialValues: INITIAL_FORM_STATE_REGISTER,
    validate: registerValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values: Values) => {
      values = Object.assign(values, { profile: file || "" });

      console.log(values);
    },
  });

  //Formik doest not support file input, so we need to create a handler for it
  /**
   this code allows a user to upload a file, converts the file to a Base64 string,
   and stores the Base64 string in the state for further use in the application.
   This can be useful in scenarios where you need to send the file to a server
   as a string instead of a file, or when you want to display the uploaded file
   (if it’s an image) directly from the Base64 string.
   */
  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) {
      return;
    }
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64 as string);
  };

  return (
    <div className="container mx-auto">
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
        <div
          className={styles.glass}
          style={{ width: "45%", paddingTop: "3em" }}
        >
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Register</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Happy to join you!
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                {file && file ? (
                  <img src={file} className={styles.profile_img} alt="avatar" />
                ) : (
                  <Image
                    src={avatar}
                    className={styles.profile_img}
                    alt="avatar"
                  />
                )}
              </label>

              <input
                onChange={onUpload}
                className={styles.customFileInput}
                type="file"
                id="profile"
                name="profile"
              />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("email")}
                className={styles.textbox}
                type="text"
                placeholder="Email*"
              />
              <input
                {...formik.getFieldProps("username")}
                className={styles.textbox}
                type="text"
                placeholder="Username*"
              />
              <input
                {...formik.getFieldProps("password")}
                className={styles.textbox}
                type="text"
                placeholder="Password*"
              />
              <button className={styles.btn} type="submit">
                Register
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Already Register?{" "}
                <Link className="text-red-500" href="/">
                  Login Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
