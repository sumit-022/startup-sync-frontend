import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { resolvePath } from "@/lib/resolve-path";
import { verifyToken } from "@/lib/server/auth-utils";
import DashboardTemplate from "@/components/templates/Dashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Company | Startup Sync",
};

export default function CompanyLayout({
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
