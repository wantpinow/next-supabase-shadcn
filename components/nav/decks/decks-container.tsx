import { DecksSidebar } from "@/components/nav/decks/side/decks-sidebar";

export const DecksSidebarContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="md:flex">
      <DecksSidebar />
      <div className="grow max-w-[1400px] px-8 py-6">{children}</div>
    </div>
  );
};
