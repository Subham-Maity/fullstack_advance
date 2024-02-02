"use client";
import React, { useEffect, useState } from "react";
import LoginSkeleton from "@/loading/skeleton/auth-login-skeleton";
import LoginForm from "@/components/auth/login/login-form";

const Login = () => {
  //Handle Loading Skeleton
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer: NodeJS.Timeout = setTimeout(() => {
      setLoading(false);
    }, 0); //Delay the loading of the component

    return () => clearTimeout(timer);
  }, []);
  return (
    <div>
      {loading ? (
        <>
          <LoginSkeleton />
        </>
      ) : (
        <div>
          <LoginForm />
        </div>
      )}
    </div>
  );
};

export default Login;
