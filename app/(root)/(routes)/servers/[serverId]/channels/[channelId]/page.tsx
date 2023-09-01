import ChatHeader from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import prismadb from "@/lib/prismadb";
import { getCurrentUser } from "@/lib/session";
import { ChannelType } from "@prisma/client";
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
      {channel.type === ChannelType.TEXT && (
        <>
          {/* <ChatMessages
            member={member}
            name={channel.name}
            chatId={channel.id}
            type="channel"
            apiUrl="/api/messages"
            socketUrl="/api/socket/messages"
            socketQuery={{
              channelId: channel.id,
              serverId: channel.serverId,
            }}
            paramKey="channelId"
            paramValue={channel.id}
          /> */}
          <ChatInput
            name={channel.name}
            type="channel"
            apiUrl="/api/socket/messages"
            query={{
              channelId: channel.id,
              serverId: channel.serverId,
            }}
          />
        </>
      )}
    </div>
  );
};

export default ChannelIdPage;
