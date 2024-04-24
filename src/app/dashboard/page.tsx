import DashboardTemplate from "@/components/templates/Dashboard";
import prisma from "@/lib/db/prisma";
import { getAuthData } from "@/lib/server/auth-utils";
import getCompanies from "@/lib/server/company-utils";
import { cookies } from "next/headers";

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
  const hours = new Date().getHours();
  const token = cookies().get("token")?.value;
  const user = getAuthData(token);
  const company_count = await prisma.company.count();

  return (
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
  );
}
