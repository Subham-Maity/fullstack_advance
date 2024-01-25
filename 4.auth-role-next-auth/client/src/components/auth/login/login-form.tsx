"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form/shadcn-form";
import { Input } from "@/components/ui/input/shadcn-input";
import { CardWrapper } from "@/middleware/wrappers/card/card-wrapper";
import { ShadcnButton } from "@/components/ui/button/shadcn-button";
import { LoginSchema } from "@/schemas/login/login.validation";
import { FormError } from "@/components/ui/message/form/form-error";
import { FormSuccess } from "@/components/ui/message/form/form-success";
//
// const LoginForm = () => {
//   const searchParams = useSearchParams();
//   const callbackUrl = searchParams.get("callbackUrl");
//   const urlError =
//     searchParams.get("error") === "OAuthAccountNotLinked"
//       ? "Email already in use with different provider!"
//       : "";
//
//   const [showTwoFactor, setShowTwoFactor] = useState(false);
//   const [error, setError] = useState<string | undefined>("");
//   const [success, setSuccess] = useState<string | undefined>("");
//   const [isPending, startTransition] = useTransition();
//
//   const form = useForm<z.infer<typeof LoginSchema>>({
//     resolver: zodResolver(LoginSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });
//
//   const onSubmit = (values: z.infer<typeof LoginSchema>) => {
//     setError("");
//     setSuccess("");
//   };
//
//   return (
//     <CardWrapper
//       headerLabel="Welcome back"
//       backButtonLabel="Don't have an account?"
//       backButtonHref="/auth/register"
//       showSocial
//     >
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           <div className="space-y-4">
//             {showTwoFactor && (
//               <FormField
//                 control={form.control}
//                 name="code"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Two Factor Code</FormLabel>
//                     <FormControl>
//                       <Input
//                         {...field}
//                         disabled={isPending}
//                         placeholder="123456"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             )}
//             {!showTwoFactor && (
//               <>
//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Email</FormLabel>
//                       <FormControl>
//                         <Input
//                           {...field}
//                           disabled={isPending}
//                           placeholder="john.doe@example.com"
//                           type="email"
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="password"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Password</FormLabel>
//                       <FormControl>
//                         <Input
//                           {...field}
//                           disabled={isPending}
//                           placeholder="******"
//                           type="password"
//                         />
//                       </FormControl>
//                       <ShadcnButton
//                         size="sm"
//                         variant="link"
//                         asChild
//                         className="px-0 font-normal"
//                       >
//                         <Link href="/auth/reset">Forgot password?</Link>
//                       </ShadcnButton>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </>
//             )}
//           </div>
//           <FormError message={error || urlError} />
//           <FormSuccess message={success} />
//           <ShadcnButton disabled={isPending} type="submit" className="w-full">
//             {showTwoFactor ? "Confirm" : "Login"}
//           </ShadcnButton>
//         </form>
//       </Form>
//     </CardWrapper>
//   );
// };
//
// export default LoginForm;

const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Two Factor Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="123456"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="john.doe@example.com"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="******"
                          type="password"
                        />
                      </FormControl>
                      <ShadcnButton
                        size="sm"
                        variant="link"
                        asChild
                        className="px-0 font-normal"
                      >
                        <Link href="/auth/reset">Forgot password?</Link>
                      </ShadcnButton>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <ShadcnButton disabled={isPending} type="submit" className="w-full">
            {showTwoFactor ? "Confirm" : "Login"}
          </ShadcnButton>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
