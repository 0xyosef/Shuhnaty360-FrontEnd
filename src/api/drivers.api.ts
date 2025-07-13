import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { defaultInfinityQueryOptions } from "@/utils/queryOptions";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { toast } from "sonner";
import {
  DriverCreate,
  DriverList,
  DriverOption,
  TruckTypeOption,
} from "../../Api";
import { ApiListResponse, ApiResponse } from "../types";
import api, { classifyAxiosError } from "../utils/api";
import { useOptionsInfiniteQuery } from "./hooks";

const ENDPOINT = "/drivers/";
const KEY = "drivers";

export const useDriversInfinityQuery = ({ search }: { search?: string }) => {
  const { ref, inView } = useInView();

  const query = useInfiniteQuery({
    ...defaultInfinityQueryOptions<DriverList>([KEY, search]),
    queryFn: async ({ pageParam }) => {
      const response = await api.get<ApiListResponse<DriverList>>(
        ENDPOINT + `?page=${pageParam}${search ? `&search=${search}` : ""}`,
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

export const useDriversOptions = () =>
  useOptionsInfiniteQuery<DriverOption>({
    key: [KEY, "options"],
    endpoint: ENDPOINT + `options/`,
  });

export const useDriverQuery = (id?: number | string) =>
  useQuery({
    queryKey: [KEY, id],
    queryFn: async () => {
      const response = await api.get<ApiResponse<DriverList>>(
        ENDPOINT + `${id}`,
      );
      return response.data;
    },
    enabled: !!id,
  });

export const useTruckTypesOptions = () =>
  useOptionsInfiniteQuery<TruckTypeOption>({
    key: ["truckTypes", "options"],
    endpoint: ENDPOINT + `truck-types/options/`,
  });

export const useCreateDriver = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: DriverCreate) => {
      const response = await api.post(ENDPOINT + "create/", formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
    onError: (error) => {
      const err = classifyAxiosError(error);
      console.error(error);
      toast.error(err?.message || "حدث خطأ أثناء إنشاء السائق");
    },
  });

  return mutation;
};

export const useUpdateDriver = (id?: number | string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: DriverCreate) => {
      const response = await api.patch(ENDPOINT + `update/${id}`, formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
    onError: (error) => {
      const err = classifyAxiosError(error);
      console.error(error);
      toast.error(err?.message || "حدث خطأ أثناء تحديث السائق");
    },
  });

  return mutation;
};

export const useDeleteDriver = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id?: number | string) => {
      const response = await api.delete(ENDPOINT + id);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
    onError: (error) => {
      const err = classifyAxiosError(error);
      console.error(error);
      toast.error(err?.message || "حدث خطأ أثناء حذف السائق");
    },
  });

  return mutation;
};
