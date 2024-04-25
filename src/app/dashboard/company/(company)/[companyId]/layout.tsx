import CompanyTemplate from "@/components/templates/Company";
import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { resolvePath } from "@/lib/resolve-path";
import { verifyToken } from "@/lib/server/auth-utils";

export const metadata: Metadata = {
  title: "Company | Startup Sync",
};

export default function CompanyPageLayout({
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
  return <CompanyTemplate.Layout>{children}</CompanyTemplate.Layout>;
}
