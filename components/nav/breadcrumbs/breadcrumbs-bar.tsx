import Link from "next/link";

import { NavLink } from "@/types/shared";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/supabase/server";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Suspense } from "react";
import { ChevronRightIcon, LogOutIcon } from "lucide-react";

export function Breadcrumb({
  link,
  active,
}: {
  link: NavLink;
  active: boolean;
}) {
  if (active) {
    return (
      <Link href={link.href} className="font-bold text-primary">
        {link.label}
      </Link>
    );
  } else {
    return (
      <>
        <Link href={link.href} className="text-foreground/60">
          {link.label}
        </Link>
        <ChevronRightIcon className="mx-1 inline-block h-5 w-5 text-foreground/60" />
      </>
    );
  }
}

export function Breadcrumbs({ links }: { links: NavLink[] }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="text-sm">
        {links.map((link, i) => {
          const active = i === links.length - 1;
          return <Breadcrumb key={i} link={link} active={active} />;
        })}
      </div>
    </Suspense>
  );
}

export function BreadcrumbsBar({ links }: { links: NavLink[] }) {
  return (
    <div className="flex justify-between items-center gap-4 border-b pb-3 border-primary/50">
      <Breadcrumbs links={links} />
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
  );
}
