import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { toast } from "sonner";
import {
  RecipientOption,
  RecipientSerializerCreate,
  RecipientSerializerList,
} from "../../Api";
import { ApiListResponse, ApiResponse } from "../types";
import api, { classifyAxiosError } from "../utils/api";
import { defaultInfinityQueryOptions } from "../utils/queryOptions";
import { useOptionsInfiniteQuery } from "./hooks";

const ENDPOINT = "/recipient/";
const KEY = "recipients";

export const useRecipientsInfinityQuery = () => {
  const { ref, inView } = useInView();

  const query = useInfiniteQuery({
    ...defaultInfinityQueryOptions<RecipientSerializerList>([KEY]),
    queryFn: async ({ pageParam }) => {
      const response = await api.get<ApiListResponse<RecipientSerializerList>>(
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

export const useRecipientsOptions = () =>
  useOptionsInfiniteQuery<RecipientOption>({
    key: [KEY, "options"],
    endpoint: ENDPOINT + "options/",
  });

export const useRecipientQuery = (id?: number) =>
  useQuery({
    queryKey: [KEY, id],
    queryFn: async () => {
      const response = await api.get<ApiResponse<RecipientSerializerCreate>>(
        ENDPOINT + `${id}`,
      );
      return response.data;
    },
    enabled: !!id,
  });

export const useCreateRecipient = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: RecipientSerializerCreate) => {
      const response = await api.post(ENDPOINT + "create/", formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
    onError: (error) => {
      const err = classifyAxiosError(error);
      console.error(error);
      toast.error(err?.message || "حصل خطاء");
    },
  });

  return mutation;
};

export const useUpdateRecipient = (id?: number | string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: RecipientSerializerCreate) => {
      const response = await api.patch(ENDPOINT + `${id}`, formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
    onError: (error) => {
      const err = classifyAxiosError(error);
      console.error(error);
      toast.error(err?.message || "حدث خطأ أثناء تحديث العميل");
    },
  });
};

export const useDeleteRecipient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id?: number) => {
      const response = await api.delete(ENDPOINT + `${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
    onError: (error) => {
      const err = classifyAxiosError(error);
      console.error(error);
      toast.error(err?.message || "حدث خطأ أثناء حذف العميل");
    },
  });
};
