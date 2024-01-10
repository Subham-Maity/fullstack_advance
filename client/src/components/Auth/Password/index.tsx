"use client";
import React, { useEffect } from "react";
import avatar from "../../../../public/profile.png";
import styles from "./Password.module.css";
//Image and Link
import Link from "next/link";
import Image from "next/image";
//Router
import { useRouter } from "next/navigation";
//Formik
import { useFormik } from "formik";
//Validation
import { passwordValidate } from "@/validation/formik/validate/password";
import { Values } from "@/types/validation/validation";
import { INITIAL_FORM_STATE_RESET_PASSWORD } from "@/validation/formik/intialValues/resetPassword";
//Toaster
import toast, { Toaster } from "react-hot-toast";
import { AppDispatch, useAppSelector } from "@/store/redux/store";
import useFetch from "@/hooks/fetch";
import { verifyPassword } from "@/api/auth/Login/login";
import { fetchImageOwner } from "@/features/slice/user/profilePicOwnerSlice";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "@/features/slice/auth/v2/apiSlice";
import { setAccessToken } from "@/features/slice/auth/v2/auth-v2Slice";
import Cookies from "js-cookie";

const Password = () => {
  const username = useAppSelector((state) => state.user.username);

  const [{ isLoading, apiData, serverError, status }] = useFetch(
    `user/${username}`,
  );
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [login] = useLoginMutation();
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const { accessToken, refreshToken } = await login({
          username, // Use the username from state
          password: values.password,
        }).unwrap();

        dispatch(setAccessToken(accessToken));
        Cookies.set("refreshToken", refreshToken, {
          secure: true,
          // httpOnly: true,//This is for production only
        });
        router.push("/jwt/profile");

        toast.success(<b>Login Successfully...!</b>);
      } catch (error) {
        toast.error(<b>Password Not Match!</b>);
      }
    },
  });

  //Get the image of the user
  useEffect(() => {
    if (apiData && apiData?.profile) {
      dispatch(fetchImageOwner(apiData?.profile));
    }
  }, [dispatch, apiData?.profile]);
  const imageUrl = useAppSelector((state) => state.picOwner.imageUrl);
  if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;
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
            <h4 className="text-5xl font-bold text-whitex">Password</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              This is a demo of JWT authentication
            </span>
          </div>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hello {apiData?.username}</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Please enter your password to continue
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              {imageUrl && imageUrl ? (
                <Image
                  src={imageUrl || avatar}
                  className={styles.profile_img}
                  alt="avatar"
                  width={100}
                  height={100}
                />
              ) : (
                <Image
                  src={avatar}
                  className={styles.profile_img}
                  alt="avatar"
                  width={100}
                  height={100}
                />
              )}
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("password")}
                className={styles.textbox}
                type="text"
                placeholder="Password"
              />
              <button className={styles.btn} type="submit">
                Sign In
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Forgot Password?{" "}
                <Link className="text-red-500" href="/jwt/recovery">
                  Recover Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Password;
