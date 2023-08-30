import prismadb from "@/lib/prismadb";
import { getCurrentUser } from "@/lib/session";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const { name, image } = await req.json();
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const server = await prismadb.server.create({
      data: {
        userId: user.id,
        name,
        image,
        inviteCode: uuidv4(),
        channels: {
          create: [{ name: "general", userId: user.id }],
        },
        members: {
          create: [{ userId: user.id, role: MemberRole.ADMIN }],
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
