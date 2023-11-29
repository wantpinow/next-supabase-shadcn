import { DecksSidebar } from "@/components/nav/decks/side/decks-sidebar";
import { DecksTopbar } from "./top/decks-topbar";
import { BreadcrumbsProvider } from "./top/breadcrumbs-provider";

export const DecksSidebarContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="md:flex">
      <DecksSidebar className="hidden md:inline-flex" />
      <div className="md:grow">
        <BreadcrumbsProvider>
          <DecksTopbar />
          <div className="max-w-[1400px] px-8 py-6">{children}</div>
        </BreadcrumbsProvider>
      </div>
    </div>
  );
};
