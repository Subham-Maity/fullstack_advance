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
import { registerValidate } from "@/validation/formik/validate/register";
import { INITIAL_FORM_STATE_REGISTER } from "@/validation/formik/intialValues/register";
import { Values } from "@/types/validation/validation";
//Toaster
import convertToBase64 from "@/convert";
import toast, { Toaster } from "react-hot-toast";
import { registerUser } from "@/api/auth/Register/register";
import useMutation from "@/hooks/useMutation/useMutation";
import useQuery from "@/hooks/useQuery";
import { Simulate } from "react-dom/test-utils";

import { AppDispatch, useAppSelector } from "@/store/redux/store";
import { fetchImageOwner } from "@/features/slice/user/profilePicOwnerSlice";
import { useDispatch } from "react-redux";
const validFileTypes = ["image/jpg", "image/jpeg", "image/png"];
//Where to upload
const URL = "/api/v2/storage-v1/s3/images";
const Register = () => {
  const router = useRouter();
  const [uploadTriggered, setUploadTriggered] = useState(false);
  const [file, setFile] = React.useState<any>(null);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [refetch, setRefetch] = useState(0);
  const onSubmit = async (values: Values) => {
    try {
      values = Object.assign(values, { profile: imageUrls?.imageName || "" });
      console.log(values);
      let registerPromise = registerUser(values);

      await toast.promise(registerPromise, {
        loading: "Creating...",
        success: <b>Register Successfully...!</b>,
        error: <b>Could not Register.</b>,
      });

      registerPromise.then(function () {
        router.push("/");
      });
    } catch (err) {
      setError("Error registering user.");
      setImageUploadError(true);
      setFile(null); // Clear the file upon encountering an error
      return;
    }
  };

  const formik = useFormik({
    initialValues: INITIAL_FORM_STATE_REGISTER,
    validate: registerValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit,
  });

  const { mutate: uploadImage } = useMutation({ url: URL });
  const {
    data: imageUrls = [],
    isLoading: imagesLoading,
    error: fetchError,
  } = useQuery(URL, refetch);
  const [error, setError] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files === null) {
        return;
      }
      const file = e.target.files[0];

      if (!validFileTypes.includes(file.type)) {
        setError("File must be in JPG/PNG format");
        return;
      }

      const form = new FormData();
      form.append("image", file);

      await uploadImage(form);
      const base64 = await convertToBase64(e.target.files[0]);
      setFile(base64 as string);
      setTimeout(() => {
        setRefetch((s) => s + 1);
        setUploadTriggered(true); // Set uploadTriggered to true after successful upload
      }, 1000);
    } catch (err) {
      setError("File upload failed. Please try again.");
      setImageUploadError(true);
      setFile(null);
      return;
    }
  };

  useEffect(() => {
    if (uploadTriggered && imageUrls && imageUrls.imageName) {
      dispatch(fetchImageOwner(imageUrls.imageName));
    }
  }, [imageUrls, dispatch, uploadTriggered]);

  // const imageUrl = useAppSelector((state) => state.picOwner.imageUrl);

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
                // onChange={onUpload}
                onChange={handleUpload}
                required={true}
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
              <button
                className={styles.btn}
                disabled={!uploadTriggered}
                type="submit"
              >
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
