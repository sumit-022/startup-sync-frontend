import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { generateMessage, isValidBody } from "@/lib/server/response-utils";
import { signToken } from "@/lib/server/auth-utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!isValidBody(body, ["identifier", "password", "remember_me"]))
      throw new Error("Invalid request");
    const { identifier, password, remember_me } = body;
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: identifier,
          },
          {
            username: identifier,
          },
        ],
      },
    });

    if (user === null) {
      return NextResponse.json(
        generateMessage({
          message: "Account not found",
          error: "Account not found",
        }),
        { status: 401 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch === false) {
      return NextResponse.json(
        generateMessage({
          message: "Invalid password",
          error: "Invalid password",
        }),
        { status: 401 }
      );
    }

    if (remember_me === true) {
      const token = signToken(
        {
          id: user.id,
          email: user.email,
          role: "user",
          name: user.name,
          username: user.username,
        },
        {
          expiresIn: "30d",
        }
      );
      return NextResponse.json(
        generateMessage({
          message: "Successfully authenticated",
        }),
        {
          status: 200,
          headers: {
            "Set-Cookie": `token=${token}; Max-Age=${
              60 * 60 * 24 * 30
            }; Path=/; HttpOnly; SameSite=Lax`,
          },
        }
      );
    } else {
      const token = signToken({
        id: user.id,
        email: user.email,
        role: "user",
        name: user.name,
        username: user.username,
      });
      return NextResponse.json(
        generateMessage({
          message: "Successfully authenticated",
        }),
        {
          status: 200,
          headers: {
            "Set-Cookie": `token=${token}; Path=/; HttpOnly; SameSite=Lax`,
          },
        }
      );
    }
  } catch (err) {
    if (err instanceof Error)
      return NextResponse.json(
        generateMessage({
          message: "Something went wrong",
          error: err.message,
        }),
        { status: 500 }
      );
  }
}
