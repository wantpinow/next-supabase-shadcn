import { HomeSidebar } from "@/components/nav/home/side/home-sidebar";

export const HomeSidebarContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="md:flex">
      <HomeSidebar />
      <div className="grow bg-background">{children}</div>
    </div>
  );
};
