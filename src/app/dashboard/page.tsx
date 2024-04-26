import DashboardTemplate from "@/components/templates/Dashboard";
import prisma from "@/lib/db/prisma";
import { resolvePath } from "@/lib/resolve-path";
import { getAuthData, verifyToken } from "@/lib/server/auth-utils";
import { getCompanies } from "@/lib/server/company-utils";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage({
  params,
}: {
  params: {
    cursor: string | undefined;
    ord: "asc" | "desc" | undefined;
    page: string | undefined;
    limit: string | undefined;
  };
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
  const hours = new Date().getHours();
  const user = getAuthData(token);
  const company_count = await prisma.company.count();

  return (
    <DashboardTemplate.Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-xl font-medium">{`Good ${
            hours < 12 ? "Morning" : hours < 18 ? "Afternoon" : "Evening"
          } ${user?.name.split(" ")[0]},`}</h1>
        </div>
        <DashboardTemplate.Stats company_count={company_count} />
        <div className="flex justify-end">
          <DashboardTemplate.AddCompany />
        </div>
        <DashboardTemplate.Table />
      </div>
    </DashboardTemplate.Layout>
  );
}
