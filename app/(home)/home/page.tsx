import { getUser } from "@/lib/supabase/server";

export default function Home() {
  const user = getUser();
  return <div>hello {JSON.stringify(user)}</div>;
}
