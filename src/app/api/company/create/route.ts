import prisma from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import { generateMessage, isValidBody } from "@/lib/server/response-utils";
import { checkAuth, getAuthData } from "@/lib/server/auth-utils";

export async function POST(request: NextRequest) {
  try {
    const isAuthorized = checkAuth(
      request,
      (authData) => authData.role === "user"
    );
    if (!isAuthorized) {
      throw new Error("Unauthorized");
    }
    const tokenData = getAuthData(request.cookies.get("token")?.value);

    const {
      name,
      description,
      address,
      contact,
      companyType,
      website,
      gstin,
      logo,
      email,
    } = await request.json();
    const company = await prisma.company.findFirst({
      where: {
        email,
      },
    });
    if (company) {
      return NextResponse.json(
        generateMessage({
          message: "Company already exists",
          error: "Company already exists",
        }),
        { status: 400 }
      );
    }
    const newCompany = await prisma.company.create({
      data: {
        name,
        description,
        address,
        contact,
        companyType,
        website,
        gstin,
        logo,
        email,
        ownerId: tokenData.id,
      },
    });
    return NextResponse.json(
      generateMessage({
        message: "Company created successfully",
        data: newCompany,
      }),
      { status: 201 }
    );
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
