import CompanyTemplate from "@/components/templates/Company";
import { resolvePath } from "@/lib/resolve-path";
import { verifyToken } from "@/lib/server/auth-utils";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export default function AddCompanyForm() {
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
  return <CompanyTemplate.AddCompanyForm />;
}
