import prisma from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import { generateMessage } from "@/lib/server/response-utils";
import { checkAuth, getAuthData } from "@/lib/server/auth-utils";

function assertOrd(ord: string | null): ord is "asc" | "desc" {
  if (ord !== "asc" && ord !== "desc") {
    return false;
  }
  return true;
}

export async function GET(request: NextRequest) {
  try {
    const isAuthorized = checkAuth(
      request,
      (authData) => authData.role === "user"
    );
    if (!isAuthorized) {
      throw new Error("Unauthorized");
    }
    const tokenData = getAuthData(request.cookies.get("token")?.value);
    const cursor = request.nextUrl.searchParams.get("cursor") ?? undefined;
    let order = request.nextUrl.searchParams.get("ord");
    const ord = assertOrd(order) ? order : "asc";
    const page = parseInt(request.nextUrl.searchParams.get("page") ?? "1");
    const limit = parseInt(request.nextUrl.searchParams.get("limit") ?? "10");
    const companies = await prisma.company.findMany({
      where: { ownerId: tokenData.id },
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : (page - 1) * limit,
      take: limit,
      orderBy: {
        name: ord,
      },
      include: {
        Inventory: true,
      },
    });
    const total = await prisma.company.count({
      where: { ownerId: tokenData.id },
    });
    return NextResponse.json({
      data: companies,
      meta: {
        total,
        page,
        limit,
        ord,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    return NextResponse.json(
      generateMessage({
        message: err instanceof Error ? err.message : "Something went wrong",
        error: err instanceof Error ? err.message : "unknown",
      }),
      {
        status: err instanceof Error ? 401 : 500,
      }
    );
  }
}
