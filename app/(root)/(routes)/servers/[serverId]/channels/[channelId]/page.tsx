import ChatHeader from "@/components/chat/chat-header";
import prismadb from "@/lib/prismadb";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";

interface ChannelIdPageProps {
  params: {
    serverId: string;
    channelId: string;
  };
}

const ChannelIdPage = async ({ params }: ChannelIdPageProps) => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect(`/sign-in`);
  }
  const channel = await prismadb.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  if (!channel) {
    redirect("/");
  }

  return (
    <div className="flex flex-col h-full">
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type="channel"
      />
    </div>
  );
};

export default ChannelIdPage;
