import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { HomeSidebarTasksTop } from "./tasks-top";
import { HomeSidebarAuthBottom } from "./auth-bottom";

export const HomeSidebar = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "w-[260px] h-screen bg-primary text-primary-foreground px-4 py-6 flex flex-col justify-between",
        className
      )}
    >
      <HomeSidebarTasksTop />
      <HomeSidebarAuthBottom />
    </div>
  );
};
