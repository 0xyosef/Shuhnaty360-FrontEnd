import { DashboardData } from "@/types";
import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

const KEY = "dashboard";
const ENDPOINT = "/dashboard/shipment-report/";

export type DashboardFilters = {
  loading_date__gte?: Date;
  loading_date__lte?: Date;
};

export const useDashboardQuery = (filters: DashboardFilters) =>
  useQuery({
    queryKey: [KEY, filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.loading_date__gte) {
        params.append(
          "loading_date__gte",
          format(filters.loading_date__gte, "yyyy-MM-dd"),
        );
      }
      if (filters.loading_date__lte) {
        params.append(
          "loading_date__lte",
          format(filters.loading_date__lte, "yyyy-MM-dd"),
        );
      }
      const response = await api.get<DashboardData>(
        `${ENDPOINT}?${params.toString()}`,
      );
      return response.data;
    },
  });
