import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db/prisma";
import { getAuthData, checkAuth } from "@/lib/server/auth-utils";
import { cookies } from "next/headers";
import { generateMessage } from "@/lib/server/response-utils";

export async function GET(
  request: NextRequest,
  { params }: { params: { companyId: string } }
) {
  const token = cookies().get("token")?.value;
  try {
    const isAuthorized = checkAuth(
      request,
      (authData) => authData.role === "user"
    );
    if (!isAuthorized) {
      throw new Error("Unauthorized");
    }
    const tokenData = getAuthData(token);
    const { companyId } = params;
    const id = companyId as string;
    if (id === undefined) {
      throw new Error("Missing company id");
    }
    const company = await prisma.company.findFirst({
      where: {
        AND: [{ id: id }, { ownerId: tokenData.id }],
      },
    });
    if (!company) {
      return NextResponse.json(
        generateMessage({
          message: "Company not found",
          error: "Company not found",
        }),
        { status: 404 }
      );
    }
    return NextResponse.json(
      generateMessage({
        message: "Company retrieved successfully",
        data: company,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      generateMessage({
        message: "Something went wrong",
        error: err instanceof Error ? err.message : "Something went wrong",
      }),
      { status: err instanceof Error ? 401 : 500 }
    );
  }
}
