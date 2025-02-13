/** @format */
"use client";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { loginValidator } from "@/app/(frontend)/validator/manager.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed, Key, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AngularButterfly from "@/components/icons/butterfly";
import { signIn } from "next-auth/react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const AuthPage = () => {
  const router = useRouter();
  const [eyeOpen, setEyeOpen] = useState<boolean>(false);
  const loginForm = useForm<z.infer<typeof loginValidator>>({
    resolver: zodResolver(loginValidator),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const handleLoginSubmit = async (values: z.infer<typeof loginValidator>) => {
    const result = await signIn("credentials", {
      redirect: false,
      phone: values.phone,
      password: values.password,
    });

    if (result?.error) {
      toast({
        title: "Login Failed",
        description: result.error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Login Successful",
        description: "You have been logged in successfully.",
      });
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  };
  return (
    <>
      <div className="logo py-4">
        <AngularButterfly size={72} />
      </div>
      <div className="w-1/5 border border-1 rounded border-gray-50 px-10 py-8">
        <h1 className="text-2xl font-bold text-center">Manager Login</h1>
        <Form {...loginForm}>
          <form
            onSubmit={loginForm.handleSubmit(handleLoginSubmit)}
            className="mt-4 gap-2 flex flex-col"
          >
            <FormField
              control={loginForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
                      <Input
                        {...field}
                        placeholder="Enter Phone Number"
                        className="pl-10 bg-transparent"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
                      <Input
                        {...field}
                        placeholder="Enter Password"
                        className="pl-10 bg-transparent"
                        type={eyeOpen ? "text" : "password"}
                      />
                      {eyeOpen ? (
                        <Eye
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
                          onClick={() => setEyeOpen(!eyeOpen)}
                        />
                      ) : (
                        <EyeClosed
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
                          onClick={() => setEyeOpen(!eyeOpen)}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant="outline" className="text-black mt-2">
              Login
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default AuthPage;
