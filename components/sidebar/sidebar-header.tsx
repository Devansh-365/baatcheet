"use client";

import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/hooks/use-modal";
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";

import { MemberRole } from "@prisma/client";
import { ServerWithMembersWithUsers } from "@/types";

interface SidebarHeaderProps {
  server: ServerWithMembersWithUsers;
  role?: MemberRole;
}

const SidebarHeader = ({ server, role }: SidebarHeaderProps) => {
  const { onOpen } = useModal();

  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="w-full text-md capitalize font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
          {server.name}
          <ChevronDown className="h-5 w-5 ml-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen("invite", {server})}
            className="text-indigo-600 dark:text-indigo-400 focus:bg-[#5865F2] focus:dark:text-white px-3 py-2 text-xs cursor-pointer"
          >
            Invite People
            <UserPlus className="h-3 w-3 ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("editServer", { server })}
            className="px-3 py-2 text-xs cursor-pointer"
          >
            Server Settings
            <Settings className="h-3 w-3 ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("members", { server })}
            className="px-3 py-2 text-xs cursor-pointer"
          >
            Manage Members
            <Users className="h-3 w-3 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen("createChannel")}
            className="px-3 py-2 text-xs cursor-pointer"
          >
            Create Channel
            <PlusCircle className="h-3 w-3 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && <DropdownMenuSeparator />}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("deleteServer", { server })}
            className="text-rose-500 focus:bg-rose-500 focus:dark:text-white px-3 py-2 text-xs cursor-pointer"
          >
            Delete Server
            <Trash className="h-3 w-3 ml-auto" />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("leaveServer", { server })}
            className="text-rose-500 focus:bg-rose-500 focus:dark:text-white px-3 py-2 text-xs cursor-pointer"
          >
            Leave Server
            <LogOut className="h-3 w-3 ml-auto" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SidebarHeader;
