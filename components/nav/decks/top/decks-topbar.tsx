import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LogOutIcon, MenuIcon } from "lucide-react";
import { signOut } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import { DecksTopbarSidebarSheet } from "./sidebar-sheet";
import { DecksBreadcrumbs } from "./decks-breadcrumbs";

export function DecksTopbar({ className }: { className?: string }) {
  const links = [
    { label: "Decks", href: "/decks" },
    { label: "Create", href: "/decks/create" },
  ];
  return (
    <>
      <div
        className={cn(
          "flex justify-between items-center gap-4 border-b py-3 md:py-4 border-primary/50 px-4 md:px-8",
          className
        )}
      >
        <div className="grow flex gap-4 items-center">
          <DecksTopbarSidebarSheet />
          <DecksBreadcrumbs />
        </div>
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <ThemeToggle />
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Dark mode</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <form action={signOut}>
                  <Button size="icon" variant="default">
                    <LogOutIcon size={16} />
                  </Button>
                </form>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Sign out</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </>
  );
}
