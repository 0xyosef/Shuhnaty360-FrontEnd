import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { format } from "date-fns";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { toast } from "sonner";
import {
  ClientInvoiceNumberOption,
  ShipmentOption,
  ShipmentSerializerCreate,
  ShipmentSerializerDetail,
  ShipmentSerializerList,
  ShipmentStatusOption,
} from "../../Api";
import { ApiListResponse, ApiResponse } from "../types";
import api, { classifyAxiosError } from "../utils/api";
import { defaultInfinityQueryOptions } from "../utils/queryOptions";
import { removeNullOrBlankFields } from "../utils/utils";
import { useOptionsInfiniteQuery } from "./hooks";

const ENDPOINT = "/shipments/";
const KEY = "shipments";

export type ShipmentFiltersType = {
  user?: number | string;
  driver?: number | string;
  client?: number | string;
  client_branch?: number | string;
  recipient?: number | string;
  status?: number | string;
  origin_city?: number | string;
  destination_city?: number | string;
  loading_date__gte?: Date;
  loading_date__lte?: Date;
  loading_date?: string;
  client_invoice_number?: string;
  search?: string | null;
};

export const useShipmentsInfinityQuery = (
  filters?: ShipmentFiltersType | undefined,
) => {
  const { ref, inView } = useInView();

  const query = useInfiniteQuery({
    ...defaultInfinityQueryOptions<ShipmentSerializerList>([KEY, filters]),
    queryFn: async ({ pageParam }) => {
      const paramsObj: Record<string, string> = {};
      if (pageParam !== undefined) paramsObj.page = String(pageParam);
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            if (value instanceof Date) {
              paramsObj[key] = format(value, "yyyy-MM-dd");
            } else {
              paramsObj[key] = String(value);
            }
          }
        });
      }
      const params = new URLSearchParams(paramsObj);
      const response = await api.get<ApiListResponse<ShipmentSerializerList>>(
        ENDPOINT + `?${params.toString()}`,
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
export const useShipmentsOptions = () =>
  useOptionsInfiniteQuery<ShipmentOption>({
    key: [KEY, "options"],
    endpoint: ENDPOINT + `options/`,
  });

export const useShipmentsInvoiceOptions = () =>
  useOptionsInfiniteQuery<ClientInvoiceNumberOption>({
    key: [KEY, "invoice-options"],
    endpoint: ENDPOINT + `client/invoice-number/options/`,
  });

export const useShipmentStatusOptions = () =>
  useOptionsInfiniteQuery<ShipmentStatusOption>({
    key: [KEY, "status-options"],
    endpoint: ENDPOINT + `status/options/`,
  });

export const useShipmentQuery = (id?: number | string) =>
  useQuery({
    queryKey: [KEY, id],
    queryFn: async () => {
      const response = await api.get<ApiResponse<ShipmentSerializerDetail>>(
        ENDPOINT + `${id}`,
      );
      return response.data;
    },
    enabled: !!id,
  });

export const useCreateShipment = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: ShipmentSerializerCreate) => {
      const data = removeNullOrBlankFields(formData);
      if (data.loading_date)
        data.loading_date = format(new Date(data.loading_date), "yyyy-MM-dd");
      if (data.expected_arrival_date)
        data.expected_arrival_date = format(
          new Date(data.expected_arrival_date),
          "yyyy-MM-dd",
        );
      if (data.actual_delivery_date)
        data.actual_delivery_date = format(
          new Date(data.actual_delivery_date),
          "yyyy-MM-dd",
        );

      console.log("Creating shipment with data:", data);

      const response = await api.post(ENDPOINT + "create/", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
    onError: (error) => {
      const err = classifyAxiosError(error);
      console.error(error);
      toast.error(err?.message || "حصل خطاء عند إنشاء الشحنة");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  return mutation;
};

export const useUpdateShipment = (id?: number | string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: ShipmentSerializerCreate) => {
      const data = removeNullOrBlankFields(formData);
      const response = await api.patch(ENDPOINT + `update/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
    onError: (error) => {
      const err = classifyAxiosError(error);
      console.error(error);
      toast.error(err?.message || "حدث خطأ أثناء تحديث الشحنة");
    },
  });
};

export const useUpdateShipmentStatus = (keys?: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      status,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      status_name: _,
    }: {
      id: number;
      status: number;
      status_name: string;
    }) => {
      const response = await api.patch(ENDPOINT + `update/${id}`, {
        status,
      });
      return response.data;
    },

    onMutate: async ({ id, status, status_name }) => {
      await queryClient.cancelQueries({
        queryKey: [KEY, keys],
      });

      const previousData = queryClient.getQueryData<
        | InfiniteData<ApiListResponse<ShipmentSerializerList>>
        | ApiResponse<ShipmentSerializerDetail>
      >([KEY, keys]);

      if (previousData && "pages" in previousData) {
        queryClient.setQueryData<
          InfiniteData<ApiListResponse<ShipmentSerializerList>>
        >([KEY, keys], (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: {
                ...page.data,
                results: page.data.results.map((shipment) =>
                  shipment.id === id
                    ? {
                        ...shipment,
                        status: {
                          ...shipment.status!,
                          id: status,
                          name_ar: status_name,
                        },
                      }
                    : shipment,
                ),
              },
            })),
          };
        });
      } else if (previousData && "data" in previousData) {
        queryClient.setQueryData<ApiResponse<ShipmentSerializerDetail>>(
          [KEY, id],
          (oldData) => {
            if (!oldData) return oldData;
            return {
              ...oldData,
              data: {
                ...oldData.data,
                status: {
                  ...oldData.data.status!,
                  id: status,
                  name_ar: status_name,
                },
              },
            };
          },
        );
      }

      return { previousData };
    },
    onError: (error, _, context) => {
      if (context?.previousData) {
        queryClient.setQueryData([KEY, keys], context.previousData);
      }
      const err = classifyAxiosError(error);
      console.error(error);
      toast.error(err?.message || "حدث خطأ أثناء تحديث حالة الشحنة");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY, keys] });
    },
  });
};

export const useDeleteShipment = () => {
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
      toast.error(err?.message || "حدث خطأ أثناء حذف الشحنة");
    },
  });

  return mutation;
};
