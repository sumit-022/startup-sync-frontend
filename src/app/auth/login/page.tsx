import { verifyToken } from "@/lib/server/auth-utils";
import { resolvePath } from "@/lib/resolve-path";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Auth from "@/components/templates/Auth";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to Startup Sync",
};

export default function LoginPage() {
  const token = cookies().get("token")?.value;
  if (token && verifyToken(token, (auth) => auth.role === "user")) {
    redirect(resolvePath("/dashboard").toString());
  }
  return <Auth.LoginForm />;
}
