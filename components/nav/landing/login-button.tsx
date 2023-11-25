import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { getUser } from "@/lib/supabase/server";
import Link from "next/link";

export async function LoginButton() {
  const user = await getUser();

  return (
    <Button variant="default" asChild>
      {user ? (
        <Link href="/home">Dashboard</Link>
      ) : (
        <Link href="/login">
          <Icon name="log-in" className="mr-2" size={16} />
          Login
        </Link>
      )}
    </Button>
  );
}
