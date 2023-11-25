import { Button } from "@/components/ui/button";
import { getUser, signOut } from "@/lib/supabase/server";

export async function HomeSidebarAuthBottom() {
  const user = await getUser();

  return (
    <div>
      <form action={signOut}>
        <Button variant="secondary" className="w-full">
          {user?.email ?? "Not logged in"}
        </Button>
      </form>
    </div>
  );
}
