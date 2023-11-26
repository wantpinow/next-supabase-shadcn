import Link from "next/link";

import { NavLink } from "@/types/shared";
import Icon from "../../ui/icon";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/supabase/server";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ThemeToggle } from "@/components/theme/theme-toggle";

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
      <Link href={link.href} className="text-foreground/60">
        {link.label}
      </Link>
    );
  }
}

export function Breadcrumbs({ links }: { links: NavLink[] }) {
  let key = 0;
  const crumbs = [];
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    const active = i === links.length - 1;
    crumbs.push(<Breadcrumb key={key++} link={link} active={active} />);
    if (!active) {
      crumbs.push(
        <Icon
          name="chevron-right"
          key={key++}
          className="mx-1 inline-block h-5 w-5 text-foreground/60"
        />
      );
    }
  }

  return <div className="text-sm">{crumbs}</div>;
}

export function BreadcrumbsBar({ links }: { links: NavLink[] }) {
  return (
    <div className="flex justify-between items-center gap-4 border-b pb-3 border-primary/50">
      <Breadcrumbs links={links} />
      <div className="flex gap-2">
        <ThemeToggle />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <form action={signOut}>
                <Button size="icon" variant="default">
                  <Icon name="log-out" size={16} />
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
