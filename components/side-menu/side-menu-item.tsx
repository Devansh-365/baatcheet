"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { ActionTooltip } from "@/components/action-tooltip";
import BorderedBadge from "../ui/bordered-badge";

interface SideMenuItemProps {
  id: string;
  image: string;
  name: string;
}

export const SideMenuItem = ({ id, image, name }: SideMenuItemProps) => {
  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    router.push(`/servers/${id}`);
  };

  return (
    <ActionTooltip side="right" align="center" label={name}>
      <button onClick={onClick} className="group relative flex items-center">
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
            params?.serverId !== id && "group-hover:h-[20px]",
            params?.serverId === id ? "h-[36px]" : "h-[8px]"
          )}
        />
        <BorderedBadge className="pointer-events-none z-[10000]" count={12} />
        <div
          className={cn(
            "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
            params?.serverId === id &&
              "bg-primary/10 text-primary rounded-[16px]"
          )}
        >
          <Image
            fill
            src={image}
            alt="Channel"
            unoptimized
            priority
            loader={({ src }) => `${src}`}
          />
        </div>
      </button>
    </ActionTooltip>
  );
};
