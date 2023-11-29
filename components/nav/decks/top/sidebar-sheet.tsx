"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DecksSidebar } from "@/components/nav/decks/side/decks-sidebar";
import { MenuIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useBreakpoint } from "@/lib/tailwind";

export function DecksTopbarSidebarSheet({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const path = usePathname();
  const { isMd } = useBreakpoint("md");
  useEffect(() => {
    setOpen(false);
  }, [path]);
  useEffect(() => {
    if (isMd) {
      setShow(false);
      setOpen(false);
    } else {
      setShow(true);
    }
  }, [isMd]);
  if (!show) return null;
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost">
          <MenuIcon size={16} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className={cn("w-fit p-0", className)}>
        <DecksSidebar />
      </SheetContent>
    </Sheet>
  );
}
