import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { City, CityOption } from "../../Api";
import { ApiListResponse } from "../types";
import api from "../utils/api";
import { defaultInfinityQueryOptions } from "../utils/queryOptions";
import { useOptionsInfiniteQuery } from "./hooks";

const ENDPOINT = "/cities/";

export const useCitiesInfinityQuery = () => {
  const { ref, inView } = useInView();

  const query = useInfiniteQuery({
    ...defaultInfinityQueryOptions<City>(["cities"]),
    queryFn: async ({ pageParam }) => {
      const response = await api.get<ApiListResponse<City>>(
        ENDPOINT + `?page=${pageParam}`,
      );
      return response.data;
    },
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
  };
};

export const useCitiesOptions = () =>
  useOptionsInfiniteQuery<CityOption>({
    key: ["cities", "options"],
    endpoint: ENDPOINT + "options/",
  });
