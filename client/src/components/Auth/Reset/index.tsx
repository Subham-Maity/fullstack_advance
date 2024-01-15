"use client";
import React, { useEffect } from "react";
import styles from "./Reset.module.css";
//Image and Link
import Link from "next/link";
import Image from "next/image";
//Router
import { useRouter } from "next/navigation";
//Formik
import { useFormik } from "formik";
//Validation
import { resetPasswordValidate } from "@/validation/formik/validate/resetPassword";
import { Values } from "@/types/validation/validation";
import { INITIAL_FORM_STATE_PASSWORD } from "@/validation/formik/intialValues/password";
//Toaster
import toast, { Toaster } from "react-hot-toast";
import { resetPassword } from "@/api/auth/ResetPassword/resetPassword";
import { useAppSelector } from "@/store/redux/store";
import useFetch from "@/hooks/fetch";

const Reset = () => {
  const router = useRouter();
  const username: any = useAppSelector((state) => state.user.username);
  const [{ isLoading, apiData, status, serverError }] = useFetch(
    "auth/createResetSession",
  );

  console.log(apiData);
  const formik = useFormik({
    initialValues: INITIAL_FORM_STATE_PASSWORD,
    validate: resetPasswordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let resetPromise = resetPassword({ username, password: values.password });
      console.log(resetPromise);

      toast.promise(resetPromise, {
        loading: "Updating...",
        success: <b>Reset Successfully...!</b>,
        error: <b>Could not Reset!</b>,
      });

      resetPromise.then(function () {
        router.push("/jwt/password");
      });
    },
  });
  if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;
  if (status && status !== 201) return router.push("/jwt/password");
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
        <div className={styles.glass} style={{ width: "30%" }}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Reset</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter new password.
            </span>
          </div>

          <form className="py-20" onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("password")}
                className={styles.textbox}
                type="text"
                placeholder="New Password"
              />
              <input
                {...formik.getFieldProps("confirm_pwd")}
                className={styles.textbox}
                type="text"
                placeholder="Repeat Password"
              />
              <button className={styles.btn} type="submit">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reset;
