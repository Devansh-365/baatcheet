import { NextResponse } from "next/server";
import * as z from "zod";
import bcrypt from "bcrypt";
import prismadb from "@/lib/prismadb";

const userSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const body = userSchema.parse(json);

    const { email, password } = body;

    if (!email || !password) {
      return new NextResponse("Missing Fields", { status: 400 });
    }

    const exist = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (exist) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prismadb.user.create({
      data: {
        email,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[REGISTER_USER]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
