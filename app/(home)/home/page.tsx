import { BreadcrumbsBar } from "@/components/nav/breadcrumbs/breadcrumbs-bar";
import { getUser } from "@/lib/supabase/server";

export default function Home() {
  const user = getUser();
  return (
    <div>
      <BreadcrumbsBar
        links={[
          {
            label: "Home",
            href: "/home",
          },
          {
            label: "Dashboard",
            href: "/home",
          },
        ]}
      />
    </div>
  );
}
