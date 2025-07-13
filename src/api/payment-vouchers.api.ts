import { useAuth } from "@/hooks/useAuth";
import { ApiListResponse, ApiResponse } from "@/types";
import api, { classifyAxiosError } from "@/utils/api";
import { defaultInfinityQueryOptions } from "@/utils/queryOptions";
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  PaymentVoucherCreate,
  PaymentVoucherDetail,
  PaymentVoucherList,
  PaymentVoucherUpdate,
} from "Api";
import { format } from "date-fns";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { toast } from "sonner";

const ENDPOINT = "/payment-vouchers/";
const KEY = "payment-vouchers";

export const useCreatePaymentVoucher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PaymentVoucherCreate) => {
      return api.post(ENDPOINT + "create/", data);
    },
    onSuccess: () => {
      toast.success("تم إنشاء سند الصرف بنجاح");
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
    onError: (error) => {
      const err = classifyAxiosError(error);
      console.error(error);
      toast.error(err?.message || "حدث خطأ أثناء إنشاء سند الصرف");
    },
  });
};

export const useUpdatePaymentVoucher = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PaymentVoucherUpdate) => {
      return api.put(ENDPOINT + `update/${id}/`, data);
    },
    onSuccess: () => {
      toast.success("تم تحديث سند الصرف بنجاح");
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
    onError: (error) => {
      const err = classifyAxiosError(error);
      console.error(error);
      toast.error(err?.message || "حدث خطأ أثناء تحديث سند الصرف");
    },
  });
};

export const useApprovePaymentVoucher = (keys?: any) => {
  const { userId } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      approval_status,
      rejection_reason,
    }: {
      id: number;
      approval_status: "approved" | "rejected";
      rejection_reason: string;
    }) => {
      const response = await api.patch(ENDPOINT + `update/${id}/`, {
        approval_status,
        approved_by: userId,
        rejection_reason,
      });
      return response.data;
    },

    onMutate: async ({ id, approval_status, rejection_reason }) => {
      await queryClient.cancelQueries({
        queryKey: [KEY, keys],
      });

      const previousData = queryClient.getQueryData<
        | InfiniteData<ApiListResponse<PaymentVoucherUpdate>>
        | ApiResponse<PaymentVoucherUpdate>
      >([KEY, keys]);

      if (previousData && "pages" in previousData) {
        queryClient.setQueryData<
          InfiniteData<ApiListResponse<PaymentVoucherUpdate>>
        >([KEY, keys], (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: {
                ...page.data,
                results: page.data.results.map((voucher) =>
                  voucher.id === id
                    ? {
                        ...voucher,
                        approval_status,
                        approved_by: userId,
                        rejection_reason,
                      }
                    : voucher,
                ),
              },
            })),
          };
        });
      } else if (previousData && "data" in previousData) {
        queryClient.setQueryData<ApiResponse<PaymentVoucherUpdate>>(
          [KEY, id],
          (oldData) => {
            if (!oldData) return oldData;
            return {
              ...oldData,
              data: {
                ...oldData.data,
                approval_status,
                approved_by: userId,
                rejection_reason,
              },
            };
          },
        );
      }

      return { previousData };
    },
    onError: (error, _, context) => {
      if (context?.previousData) {
        queryClient.setQueryData([KEY], context.previousData);
      }
      const err = classifyAxiosError(error);
      console.error(error);
      toast.error(err?.message || "حدث خطأ أثناء تحديث حالة سند الصرف");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [KEY, keys] });
    },
  });
};

export const usePaymentVoucher = (id: string) => {
  return useQuery({
    queryKey: [KEY, id],
    queryFn: async () => {
      const response = await api.get<ApiResponse<PaymentVoucherList>>(
        `${ENDPOINT}${id}`,
      );
      return response.data;
    },
  });
};

export const usePaymentVoucherQuery = (id?: string) => {
  return useQuery({
    queryKey: [KEY, id],
    queryFn: async () => {
      if (!id) return null;
      const response = await api.get<ApiResponse<PaymentVoucherDetail>>(
        `${ENDPOINT}${id}`,
      );
      return response.data;
    },
    enabled: !!id,
  });
};

export type PaymentVoucherFilters = {
  created_by?: number;
  issuing_branch?: string;
  voucher?: string;
  shipment?: string;
  invoice?: string;
  search?: string | undefined;
  loading_date__gte?: Date;
  loading_date__lte?: Date;
};

export const usePaymentVouchersInfinityQuery = (
  filters: PaymentVoucherFilters = {},
) => {
  const { ref, inView } = useInView();

  const query = useInfiniteQuery({
    ...defaultInfinityQueryOptions<PaymentVoucherList>([KEY, filters]),
    queryFn: async ({ pageParam = 1 }) => {
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
      const response = await api.get<ApiListResponse<PaymentVoucherList>>(
        `${ENDPOINT}?${params.toString()}`,
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
