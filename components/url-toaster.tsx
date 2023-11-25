"use client";

import { useCallback, useEffect } from "react";
import { toast } from "./ui/use-toast";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function UrlToaster() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const success = searchParams.get("success");

  const createQueryString = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams);
      if (value === null) {
        params.delete(name);
        return params.toString();
      } else {
        params.set(name, value);
      }
      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    if (error) {
      toast({
        title: "An error occured",
        description: error,
        variant: "destructive",
      });
      setTimeout(() => {
        router.push(pathname + "?" + createQueryString("error", null));
      }, 1000);
    }
    if (success) {
      toast({
        title: success,
      });
      setTimeout(() => {
        router.push(pathname + "?" + createQueryString("success", null));
      }, 1000);
    }
  }, [error, pathname, router, createQueryString]);
  return <div>testing</div>;
}
