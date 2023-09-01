import SideMenuSkeleton from "@/components/side-menu/side-menu-skeleton";
import prismadb from "@/lib/prismadb";
import { getCurrentUser } from "@/lib/session";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

const SideMenu = dynamic(() => import("@/components/side-menu"), {
  loading: () => <SideMenuSkeleton />,
});

const Sidebar = dynamic(() => import("@/components/sidebar"), {
  loading: () => <p>loading...</p>,
});

const ServerIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect(`/sign-in`);
  }

  const server = await prismadb.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          userId: user.id,
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  return (
    <div className="h-full">
      <SideMenu />
      <div className="hidden md:flex h-full w-60 z-20 md:ml-[72px]  flex-col fixed inset-y-0">
        <Sidebar serverId={params.serverId} />
      </div>
      <main className="h-full md:pl-[310px] pl-[70px]">{children}</main>
    </div>
  );
};

export default ServerIdLayout;
