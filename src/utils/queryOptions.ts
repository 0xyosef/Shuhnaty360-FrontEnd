import { infiniteQueryOptions } from "@tanstack/react-query";
import { flatMap } from "lodash";
import { ApiListResponse } from "../types";
import { getUrlParams } from "./utils";

export const defaultInfinityQueryOptions = <T>(queryKey: any[]) =>
  infiniteQueryOptions({
    queryKey,
    initialPageParam: 1,
    getPreviousPageParam: (lastPage: ApiListResponse<T>) =>
      getUrlParams(lastPage.data.previous)?.page || undefined,
    getNextPageParam: (lastPage: ApiListResponse<T>) =>
      getUrlParams(lastPage.data.next)?.page || undefined,
    select: (data) => {
      const items = flatMap(data.pages, (page) => page.data.results);
      const count = data.pages[0]?.data.count;
      return {
        items,
        count,
      };
    },
  });
