import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { DecksSidebarDecksTop } from "./decks-top";
import { DecksSidebarAuthBottom } from "./auth-bottom";

export const DecksSidebar = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "flex-none w-[260px] h-screen bg-primary text-primary-foreground px-4 py-6 flex flex-col justify-between",
        className
      )}
    >
      <DecksSidebarDecksTop />
      <DecksSidebarAuthBottom />
    </div>
  );
};
