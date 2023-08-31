import React from "react";
import SidebarHeader from "./sidebar-header";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

interface SidebarProps {
  serverId: string;
}

const Sidebar = async ({ serverId }: SidebarProps) => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect(`/sign-in`);
  }

  const server = await prismadb.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          user: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  const role = server.members.find(
    (member: any) => member.userId === user.id
  )?.role;

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <SidebarHeader server={server} role={role} />
    </div>
  );
};

export default Sidebar;
