"use client";

import Input from "../atoms/input";
import Checkbox from "@/components/atoms/checkbox";
import Image from "next/image";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import clsx from "clsx";
import axios from "@/config/axios.config";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

//assets
import { FaGoogle, FaLinkedin, FaGithub } from "react-icons/fa";
import logo from "@/assets/images/logo.png";
import Button from "@/components/atoms/button";

type UserData = {
  identifier: string;
  password: string;
  remember_me?: boolean;
};

const SocialButton = ({
  children,
  onLogin,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  onLogin: () => void;
}) => {
  return (
    <button
      type="button"
      className={clsx(
        "inline-flex justify-center w-full px-4 py-2 text-sm font-medium border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500",
        className
      )}
      onClick={onLogin}
    >
      {children}
    </button>
  );
};

export default function LoginForm() {
  const redirectUri = useSearchParams().get("redirect");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>({
    defaultValues: {
      identifier: "",
      password: "",
      remember_me: false,
    },
  });

  const onSubmit = async (data: UserData) => {
    try {
      const response = await axios.post("/auth/login", data);
      if (response.status === 200) {
        toast.success("Login successful");
        router.push(redirectUri || "/dashboard");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An error occurred");
      }
    }
  };

  return (
    <>
      <div className="flex h-screen">
        <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <Image src={logo} alt="Startup Sync" width={48} height={48} />
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Or{" "}
              <Link
                href="/auth/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Create an account
              </Link>
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3">
              <SocialButton
                onLogin={() => {}}
                className="bg-[#ea4335] text-white"
              >
                <FaGoogle className="w-4 h-4" />
              </SocialButton>
              <SocialButton
                onLogin={() => {}}
                className="bg-[#0077b5] text-white"
              >
                <FaLinkedin className="w-4 h-4" />
              </SocialButton>
              <SocialButton onLogin={() => {}} className="bg-[#333] text-white">
                <FaGithub className="w-4 h-4" />
              </SocialButton>
            </div>
            <div className="mt-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Input
                  name="identifier"
                  type="text"
                  placeholder="Email address"
                  register={register}
                  rules={{ required: "Email is required" }}
                  error={!!errors.identifier}
                />
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  register={register}
                  rules={{ required: "Password is required" }}
                  error={!!errors.password}
                />
                <div className="flex justify-between">
                  <Checkbox
                    label="Remember me"
                    name="remember_me"
                    register={register}
                  />
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Button type="submit" variant="curved" className="w-full">
                  Sign in
                </Button>
              </form>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <Image
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
            width={1908}
            height={1146}
          />
        </div>
      </div>
    </>
  );
}
