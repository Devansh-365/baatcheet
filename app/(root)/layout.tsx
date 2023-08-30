import SideMenu from "@/components/side-menu";
import SideMenuSkeleton from "@/components/side-menu/side-menu-skeleton";
import React, { Suspense } from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <Suspense fallback={<SideMenuSkeleton />}>
        <SideMenu />
      </Suspense>
      <main className="md:pl-[72px] h-full">{children}</main>
    </div>
  );
};

export default RootLayout;
