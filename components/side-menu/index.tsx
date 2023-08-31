import { cn, delay } from "@/lib/utils";
import React from "react";
import { SideMenuAction } from "./side-menu-action";
import prismadb from "@/lib/prismadb";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { SideMenuItem } from "./side-menu-item";

const SideMenu = async ({
  className,
}: React.HTMLAttributes<HTMLDivElement>) => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect(`/sign-in`);
  }

  await delay(10000);

  const servers = await prismadb.server.findMany({
    where: {
      members: {
        some: {
          userId: user.id,
        },
      },
    },
  });

  console.log("SERVERS: ", servers);

  return (
    <div
      className={cn(
        "hidden-scrollbar fixed z-50 h-screen w-[70px] gap-3 overflow-y-auto pt-3",
        "bg-gradient-to-b from-[#001F22] to-[#001F22]",
        className
      )}
    >
      <div className="pointer-events-none fixed bottom-0 z-10 h-32 w-[70px] bg-gradient-to-b from-transparent to-black/20"></div>
      <SideMenuAction />
      {servers.map((server) => (
        <div key={server.id} className="my-3 mx-auto">
          <SideMenuItem
            id={server.id}
            name={server.name}
            image={server.image}
          />
        </div>
      ))}
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4"></div>
    </div>
  );
};

export default SideMenu;
