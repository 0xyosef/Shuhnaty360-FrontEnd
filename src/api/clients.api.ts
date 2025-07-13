import { defaultInfinityQueryOptions } from "@/utils/queryOptions";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { toast } from "sonner";
import { z } from "zod";
import {
  ClientBranchCreate,
  ClientBranchOption,
  ClientOption,
  ClientSerializerDetails,
  ClientSerializerList,
} from "../../Api";
import { ApiListResponse, ApiResponse } from "../types";
import api, { classifyAxiosError } from "../utils/api";
import { useOptionsInfiniteQuery } from "./hooks";

export const clientBranchSchema = z.object({
  name: z.string().min(1, "الاسم مطلوب"),
  address: z.string().min(1, "العنوان مطلوب"),
  name_address: z.string().optional().nullable(),
  phone_number: z.string().optional().nullable(),
  second_phone_number: z.string().optional().nullable(),
  client: z.number(),
  city: z.number(),
});

const ENDPOINT = "/clients/";
const KEY = "clients";

export const useClientsInfinityQuery = ({ search }: { search?: string }) => {
  const { ref, inView } = useInView();

  const query = useInfiniteQuery({
    ...defaultInfinityQueryOptions<ClientSerializerList>([KEY, search]),
    queryFn: async ({ pageParam }) => {
      const response = await api.get<ApiListResponse<ClientSerializerList>>(
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

export const useClientsOptions = () =>
  useOptionsInfiniteQuery<ClientOption>({
    key: [KEY, "options"],
    endpoint: ENDPOINT + "options/",
  });

export const useClientQuery = (id?: number | string) =>
  useQuery({
    queryKey: [KEY, id],
    queryFn: async () => {
      const response = await api.get<ApiResponse<ClientSerializerDetails>>(
        ENDPOINT + `${id}`,
      );
      return response.data;
    },
    enabled: !!id,
  });

export const useCreateClient = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: ClientSerializerList) => {
      const response = await api.post(ENDPOINT, formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
    onError: (error) => {
      const err = classifyAxiosError(error);
      console.error(error);
      toast.error(err?.message || "حدث خطأ أثناء إنشاء العميل");
    },
  });

  return mutation;
};

export const useUpdateClient = (id?: number | string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: ClientSerializerDetails) => {
      const response = await api.patch(ENDPOINT + `update/${id}`, formData);
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

  return mutation;
};

export const useDeleteClient = () => {
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
      toast.error(err?.message || "حدث خطأ أثناء حذف العميل");
    },
  });

  return mutation;
};

export const useCreateClientBranch = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: ClientBranchCreate) => {
      const response = await api.post(ENDPOINT + "branch/create", formData);
      return response.data;
    },
    onError: (error) => {
      const err = classifyAxiosError(error);
      console.error(error);
      toast.error(err?.message || "حدث خطأ أثناء إنشاء الفرع");
    },
    onSuccess: () => {
      toast.success("تم إنشاء الفرع بنجاح");
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  return mutation;
};

export const useUpdateClientBranch = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: ClientBranchCreate) => {
      const response = await api.put(
        ENDPOINT + `branch/update/${data.id}`,
        data,
      );
      return response.data;
    },
    onError: (error) => {
      const err = classifyAxiosError(error);
      console.error(error);
      toast.error(err?.message || "حدث خطأ أثناء تحديث الفرع");
    },
    onSuccess: () => {
      toast.success("تم تحديث الفرع بنجاح");
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  return mutation;
};

export const useDeleteClientBranch = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(ENDPOINT + `branch/delete/${id}`);
      return response.data;
    },
    onError: (error) => {
      const err = classifyAxiosError(error);
      console.error(error);
      toast.error(err?.message || "حدث خطأ أثناء حذف الفرع");
    },
    onSuccess: () => {
      toast.success("تم حذف الفرع بنجاح");
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  return mutation;
};

export const useClientBranchesOptions = (clientId?: number) =>
  useOptionsInfiniteQuery<ClientBranchOption>({
    key: [KEY, "branches", "options", clientId],
    endpoint: ENDPOINT + `branch/options/`, // فقط المسار الأساسي
    queryParams: clientId ? { client_id: clientId } : {}, // تمرير client_id كـ query param
    enabled: !!clientId,
  });
