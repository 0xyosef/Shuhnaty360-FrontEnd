import { ApiListResponse } from "@/types";
import api from "@/utils/api";
import { defaultInfinityQueryOptions } from "@/utils/queryOptions";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDebounce } from "use-debounce";

type UseOptionsQueryParams = {
  key: any[];
  endpoint: string;
  enabled?: boolean;
  queryParams?: Record<string, string | number | undefined>;
};

export const useOptionsInfiniteQuery = <T>({
  key,
  endpoint,
  enabled = true,
  queryParams = {},
}: UseOptionsQueryParams) => {
  const [search, setSearch] = useState<string | undefined>();
  const [searchTerm] = useDebounce(search, 500);
  const { ref, inView } = useInView();

  const query = useInfiniteQuery({
    ...defaultInfinityQueryOptions<T>([...key, searchTerm]),
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams({
        page: pageParam.toString(),
        ...Object.fromEntries(
          Object.entries({
            ...queryParams,
            search: searchTerm,
          }).filter(([, value]) => value !== undefined)
        ),
      });

      const response = await api.get<ApiListResponse<T>>(`${endpoint}?${params}`);
      return response.data;
    },
    placeholderData: keepPreviousData,
    enabled,
  });

  const { isFetchingNextPage, hasNextPage, fetchNextPage } = query;

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

  return {
    ...query,
    ref,
    inView,
    setSearch,
  };
};
