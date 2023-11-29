import Link from "next/link";

import { NavLink } from "@/types/shared";
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
    <div className="text-[15px]">
      {links.map((link, i) => {
        const active = i === links.length - 1;
        return <Breadcrumb key={i} link={link} active={active} />;
      })}
    </div>
  );
}
