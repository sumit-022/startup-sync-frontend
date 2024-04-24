import { verifyToken } from "@/lib/server/auth-utils";
import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { resolvePath } from "@/lib/resolve-path";
import DashboardTemplate from "@/components/templates/Dashboard";

export const metadata: Metadata = {
  title: "Dashboard | Startup Sync",
  description: "Dashboard for Startup Sync",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const url = headers().get("x-url");
  const token = cookies().get("token")?.value;
  if (!token || !verifyToken(token, (auth) => auth.role === "user")) {
    redirect(
      resolvePath(
        url == null
          ? "/auth/login"
          : `/auth/login?redirect=${encodeURIComponent(url)}`
      ).toString()
    );
  }
  return <DashboardTemplate.Layout>{children}</DashboardTemplate.Layout>;
}
