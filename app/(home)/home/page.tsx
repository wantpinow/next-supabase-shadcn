import { BreadcrumbsBar } from "@/components/nav/breadcrumbs/breadcrumbs-bar";
import { getUser } from "@/lib/supabase/server";

export default async function Home() {
  const user = await getUser();
  return (
    <div className="space-y-4">
      <BreadcrumbsBar
        links={[
          {
            label: "Decks",
            href: "/home",
          },
        ]}
      />
    </div>
  );
}
