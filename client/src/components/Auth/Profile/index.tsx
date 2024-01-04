"use client";
import React, { useEffect, useState } from "react";
import avatar from "../../../../public/profile.png";
import styles from "./Profile.module.css";
import extend from "./Profile2.module.css";
//Image and Link
import Link from "next/link";
import Image from "next/image";
//Router
import { useRouter } from "next/navigation";
//Formik
import { useFormik } from "formik";
//Validation
import { profileValidate } from "@/validation/formik/validate/profile";
import { Values } from "@/types/validation/validation";
//Toaster
import { Toaster } from "react-hot-toast";

import convertToBase64 from "@/convert";

const Profile = () => {
  const router = useRouter();
  const [file, setFile] = React.useState<any>(null);

  //Test data
  const apiData = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address: "",
  };

  const formik = useFormik({
    initialValues: {
      firstName: apiData?.firstName || "",
      lastName: apiData?.lastName || "",
      email: apiData?.email || "",
      mobile: apiData?.mobile || "",
      address: apiData?.address || "",
    },
    validate: profileValidate,
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
  //
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
          className={`${styles.glass} ${extend.glass}`}
          style={{ width: "45%", paddingTop: "3em" }}
        >
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Profile</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              You can update the details.
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
                className={styles.customFileInput}
                onChange={onUpload}
                type="file"
                id="profile"
                name="profile"
              />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <div className="name flex w-3/4 gap-10">
                <input
                  {...formik.getFieldProps("firstName")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="FirstName"
                />
                <input
                  {...formik.getFieldProps("lastName")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="LastName"
                />
              </div>

              <div className="name flex w-3/4 gap-10">
                <input
                  {...formik.getFieldProps("mobile")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="Mobile No."
                />
                <input
                  {...formik.getFieldProps("email")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="Email*"
                />
              </div>

              <input
                {...formik.getFieldProps("address")}
                className={`${styles.textbox} ${extend.textbox}`}
                type="text"
                placeholder="Address"
              />
              <button className={styles.btn} type="submit">
                Update
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                come back later?{" "}
                <button className="text-red-500">Logout</button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
