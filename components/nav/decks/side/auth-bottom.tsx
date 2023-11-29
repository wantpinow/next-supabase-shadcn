"use client";
import { useAuth } from "@/components/shared/auth-provider";
import { Button } from "@/components/ui/button";

export function DecksSidebarAuthBottom() {
  const { user } = useAuth();
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
