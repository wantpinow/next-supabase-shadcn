"use client";

import { NavLink } from "@/types/shared";
import { createContext, useContext, useState } from "react";

const BreadcrumbsContext = createContext<
  | {
      links: NavLink[];
      setLinks: (links: NavLink[]) => void;
    }
  | undefined
>(undefined);

export const BreadcrumbsProvider = ({
  children,
  initialLinks,
}: {
  children: React.ReactNode;
  initialLinks?: NavLink[];
}) => {
  const [links, setLinks] = useState<NavLink[]>(initialLinks ?? []);
  return (
    <BreadcrumbsContext.Provider value={{ links, setLinks }}>
      {children}
    </BreadcrumbsContext.Provider>
  );
};

export const useBreadcrumbs = () => {
  const context = useContext(BreadcrumbsContext);
  if (context === undefined) {
    throw new Error(
      "useBreadcrumbs must be used within a BreadcrumbsContext Provider"
    );
  }
  return context;
};
