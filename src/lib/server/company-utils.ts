import type { Company } from "@prisma/client";
import prisma from "@/lib/db/prisma";
import { AuthData } from "@/contexts/AuthContext";
import { cookies } from "next/headers";
import { getAuthData } from "./auth-utils";

type Meta = {
  total: number;
  page: string | undefined;
  limit: string | undefined;
  ord: "asc" | "desc" | undefined;
  totalPages: number;
};

export async function getCompanies({
  cursor,
  ord,
  page,
  limit,
  user,
}: {
  cursor: string | undefined;
  ord: "asc" | "desc" | undefined;
  page: string | undefined;
  limit: string | undefined;
  user: AuthData | undefined;
}): Promise<{
  companies: Company[];
  meta: Meta;
}> {
  const companies = await prisma.company.findMany({
    where: {
      ownerId: user?.id,
    },
    cursor: cursor ? { id: cursor } : undefined,
    skip: cursor ? 1 : (parseInt(page || "1") - 1) * parseInt(limit || "10"),
    take: parseInt(limit || "10"),
    orderBy: {
      name: ord,
    },
  });
  const total = await prisma.company.count({
    where: {
      ownerId: user?.id,
    },
  });
  const meta = {
    total,
    page,
    limit,
    ord,
    totalPages: Math.ceil(total / parseInt(limit || "10")),
  };
  return { companies, meta };
}

export async function getCompany({
  id,
  ownerId,
}: {
  id: string;
  ownerId: string;
}): Promise<Company | null> {
  return await prisma.company.findFirst({
    where: {
      AND: [{ id }, { ownerId }],
    },
  });
}
