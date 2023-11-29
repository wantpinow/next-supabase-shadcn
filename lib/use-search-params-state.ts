import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useSearchParamsState(
  searchParamName: string,
  defaultValue?: string
): readonly [
  searchParamsState: string | undefined,
  setSearchParamsState: (newState: string | undefined) => void
] {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const acquiredSearchParam = searchParams.get(searchParamName);
  const searchParamsState = acquiredSearchParam ?? defaultValue;

  const setSearchParamsState = (newState: string | undefined) => {
    const next = new URLSearchParams(searchParams);
    if (newState === undefined) {
      next.delete(searchParamName);
    } else {
      next.set(searchParamName, newState);
    }
    const queryString = next.toString();
    router.replace(`${pathname}?${queryString}`);
  };
  return [searchParamsState, setSearchParamsState];
}
