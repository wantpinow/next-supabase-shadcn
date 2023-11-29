"use client";

import { useEffect } from "react";
import { toast } from "../ui/use-toast";
import { useSearchParamsState } from "@/lib/use-search-params-state";

export function UrlToaster() {
  const [errorState, setErrorState] = useSearchParamsState("error");
  const [successState, setSuccessState] = useSearchParamsState("success");

  useEffect(() => {
    if (errorState) {
      toast({
        title: "An error occured",
        description: errorState,
        variant: "destructive",
      });
      setErrorState(undefined);
    }
    if (successState) {
      toast({
        title: "Success!",
        description: successState,
      });
      setSuccessState(undefined);
    }
  }, [errorState, successState, setErrorState, setSuccessState]);
  return null;
}
