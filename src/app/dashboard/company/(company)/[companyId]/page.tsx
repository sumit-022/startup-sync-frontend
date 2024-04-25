import { cookies } from "next/headers";
import prisma from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import { getAuthData } from "@/lib/server/auth-utils";

export default async function CompanyPage({
  params,
}: {
  params: { companyId: string };
}) {
  const token = cookies().get("token")?.value;
  const user = getAuthData(token);
  if (!user) {
    notFound();
  }
  const company = await prisma.company.findFirst({
    where: {
      AND: [{ id: params.companyId }, { ownerId: user.id }],
    },
  });
  if (!company) {
    notFound();
  }
  return <h1>hello</h1>;
}
