import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/supabase/server";

export async function HomeSidebarAuthBottom() {
  const user = await getUser();

  return (
    <div>
      <Button
        variant="ghost"
        className="w-full hover:bg-primary hover:text-primary-foreground"
        size="sm"
      >
        {user?.email ?? "Not logged in"}
      </Button>
    </div>
  );
}
