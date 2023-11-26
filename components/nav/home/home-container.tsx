import { HomeSidebar } from "@/components/nav/home/side/home-sidebar";

export const HomeSidebarContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="md:flex">
      <HomeSidebar />
      <div className="grow max-w-[1400px] px-8 py-6">{children}</div>
    </div>
  );
};
