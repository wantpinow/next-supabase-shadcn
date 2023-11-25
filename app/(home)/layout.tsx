import { HomeSidebarContainer } from "@/components/nav/home/home-container";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <HomeSidebarContainer>{children}</HomeSidebarContainer>;
}
