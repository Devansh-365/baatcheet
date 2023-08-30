import { cn } from "@/lib/utils";

interface SideMenuItemSkeletonProps
  extends React.HTMLAttributes<HTMLAnchorElement> {
  isActive?: boolean;
}

const SideMenuItemSkeleton = ({
  isActive,
  className,
  ...props
}: SideMenuItemSkeletonProps) => (
  <a
    href="#"
    className={cn(
      "relative block h-12 w-12 bg-[#313338] bg-cover transition-all",
      "group hover:shadow-xl focus:outline-none",
      isActive ? "rounded-[15px]" : "rounded-[100%]",
      className
    )}
    {...props}
  />
);

export default function SideMenuSkeleton() {
  return (
    <div
      className={cn(
        "hidden-scrollbar fixed z-50 h-screen w-[70px] gap-3 overflow-y-auto pt-3",
        "bg-gradient-to-b from-[#001F22] to-[#001F22]"
      )}
    >
      <div className="pointer-events-none fixed bottom-0 z-10 h-32 w-[70px] bg-gradient-to-b from-transparent to-black/20"></div>
      <div className="animate-pulse">
        {Array.from({ length: 12 }, (_, i) => (
          <SideMenuItemSkeleton key={i} className="mx-auto my-3" />
        ))}
      </div>
    </div>
  );
}
