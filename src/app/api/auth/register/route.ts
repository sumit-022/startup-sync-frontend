import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { generateMessage, isValidBody } from "@/lib/server/response-utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!isValidBody(body, ["email", "password", "name", "username"]))
      throw new Error("Invalid request");
    const { email, password, name, username } = body;

    const user = await prisma.user.findMany({
      where: {
        OR: [
          {
            email,
          },
          {
            username,
          },
        ],
      },
    });

    if (user.length > 0) {
      return NextResponse.json(
        generateMessage({
          message: "Account already exists",
          error: "Account already exists",
        }),
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        username,
      },
    });

    return NextResponse.json(
      generateMessage({
        message: "Account created successfully",
        data: {
          email: newUser.email,
        },
      }),
      { status: 201 }
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
