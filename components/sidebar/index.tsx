import React from "react";
import SidebarHeader from "./sidebar-header";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { ChannelType } from "@prisma/client";
import { SidebarSection } from "./sidebar-section";
import { SidebarChannel } from "./sidebar-channel";

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

  const textChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <SidebarHeader server={server} role={role} />
      <div className="flex-1 px-3">
        {!!textChannels?.length && (
          <div className="mb-2">
            <SidebarSection
              sectionType="channels"
              channelType={ChannelType.TEXT}
              role={role}
              label="Text Channels"
            />
            <div className="space-y-[2px]">
              {textChannels.map((channel) => (
                <SidebarChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
        {!!audioChannels?.length && (
          <div className="mb-2">
            <SidebarSection
              sectionType="channels"
              channelType={ChannelType.TEXT}
              role={role}
              label="Audio Channels"
            />
            <div className="space-y-[2px]">
              {audioChannels.map((channel) => (
                <SidebarChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
        {!!videoChannels?.length && (
          <div className="mb-2">
            <SidebarSection
              sectionType="channels"
              channelType={ChannelType.TEXT}
              role={role}
              label="Video Channels"
            />
            <div className="space-y-[2px]">
              {videoChannels.map((channel) => (
                <SidebarChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
