import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";

interface ServerIdPageProps {
  params: {
    serverId: string;
  };
}

const ServerIdPage = async ({ params }: ServerIdPageProps) => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect(`/sign-in`);
  }

  return <div className="text-3xl text-white">ServerIdPage</div>;
};

export default ServerIdPage;
