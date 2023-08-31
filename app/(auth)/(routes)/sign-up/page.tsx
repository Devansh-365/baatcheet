"use client";

import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { ReloadIcon } from "@radix-ui/react-icons";

const formSchema = z.object({
  email: z.string().email().min(1, {
    message: "Email is required.",
  }),
  password: z.string().min(4, {
    message: "Password is required.",
  }),
});

const SignInPage = () => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/register", values);

      form.reset();
      router.push(`/`);
      toast.success("User has been registered!");
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    }
  };

  return (
    <Card className="w-[350px] bg-[#202225]">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your credentials to create your account.
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
            <CardFooter className="py-4 flex flex-col">
              <Button variant="primary" className="w-full" disabled={isLoading}>
                {isLoading && (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign Up
              </Button>
              <p className="px-8 mt-3 text-center text-xs text-[#72767D]">
                {`Already have an account? `}
                <Link
                  href={`/sign-in`}
                  className="text-[#3BA55C] hover:text-[#3BA55C]/90 underline underline-offset-4"
                >
                  Sign In
                </Link>
              </p>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignInPage;
