"use client";
import React, { useEffect } from "react";
import avatar from "../../../../public/profile.png";
import styles from "./Recovery.module.css";
//Image and Link
//Router
import { useRouter } from "next/navigation";

//Toaster
import toast, { Toaster } from "react-hot-toast";
import { useAppSelector } from "@/store/redux/store";
import { handleOTPGeneration } from "@/api/OTP/generateOTP/generateOTP";
import { verifyOTP } from "@/api/OTP/verifyOTP/verifyOTP";

const Username = () => {
  const router = useRouter();
  const username: any = useAppSelector((state) => state.user.username);
  const [otp, setOtp] = React.useState("");
  useEffect(() => {
    handleOTPGeneration(username).then((OTP) => {
      // console.log(OTP);
      if (OTP) return toast.success("OTP has been send to your email!");
      return toast.error("Problem while generating OTP!");
    });
  }, [username]);
  async function onSubmit(e: any) {
    e.preventDefault();
    try {
      let { status } = await verifyOTP({ username, code: otp });
      if (status === 201) {
        toast.success("Verify Successfully!");
        router.push("/jwt/reset");
      }
    } catch (error) {
      return toast.error("Wrong OTP! Check email again!");
    }
  }
  // handler of resend OTP
  function resendOTP() {
    let sentPromise = handleOTPGeneration(username);

    toast.promise(sentPromise, {
      loading: "Sending...",
      success: <b>OTP has been send to your email!</b>,
      error: <b>Could not Send it!</b>,
    });

    sentPromise.then((OTP) => {
      console.log(OTP);
    });
  }

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

          <form className="pt-20" onSubmit={onSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <div className="input text-center">
                <span className="py-4 text-sm text-left text-gray-500">
                  Enter 6 digit OTP sent to your email address.
                </span>
                <input
                  className={styles.textbox}
                  type="text"
                  placeholder="OTP"
                  onChange={(e) => setOtp(e.target.value)}
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
              <button onClick={resendOTP} className="text-red-500">
                Resend
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Username;
