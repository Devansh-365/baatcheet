"use client";

import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";

const formSchema = z.object({
  email: z.string().email().min(1, {
    message: "Email is required.",
  }),
  password: z.string().min(4, {
    message: "Password is required.",
  }),
});

const SignInPage = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const isLoading = form.formState.isSubmitting;

  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/";

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);

      await signIn("credentials", {
        email: values.email.toLowerCase(),
        password: values.password,
        redirect: false,
        callbackUrl,
      });

      form.reset();
      router.push(`/`);
      toast.success("User has been logged in!");
    } catch (error) {
      toast.error("Your sign in request failed. Please try again.");
    }
  };

  return (
    <Card className="w-[350px] bg-[#202225]">
      <CardHeader>
        <CardTitle className="text-xl">Sign In</CardTitle>
        <CardDescription>
          Enter your credentials to sign in to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-[#B9BBBE] dark:text-[#B9BBBE]">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-[#18191C] rounded-sm border-0 focus-visible:ring-0 text-[#DCDDDE] focus-visible:ring-offset-0"
                        placeholder="Enter email"
                        {...field}
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
                    <FormLabel className="uppercase text-xs font-bold text-[#B9BBBE] dark:text-[#B9BBBE]">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        type="password"
                        className="bg-[#18191C] rounded-sm border-0 focus-visible:ring-0 text-[#DCDDDE] focus-visible:ring-offset-0"
                        placeholder="Enter Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <CardFooter className="py-4">
              <Button
                variant="primary"
                className="ml-auto"
                disabled={isLoading}
              >
                Sign In
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignInPage;