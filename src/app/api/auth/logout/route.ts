import { cookies } from "next/headers";
import { generateMessage } from "@/lib/server/response-utils";
import { NextResponse } from "next/server";

export async function POST() {
  const token = cookies().get("token")?.value;
  if (token === undefined)
    return NextResponse.json(
      generateMessage({
        message: "No token provided",
      }),
      { status: 400 }
    );
  cookies().delete("token");
  return NextResponse.json(
    generateMessage({
      message: "Successfully logged out",
    }),
    { status: 200 }
  );
}
