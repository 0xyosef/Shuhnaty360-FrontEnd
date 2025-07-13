import { CompanyBranchOption } from "../../Api";
import { useOptionsInfiniteQuery } from "./hooks";

const ENDPOINT = "/profile/";

export const useCompanyBranchesOptions = () =>
  useOptionsInfiniteQuery<CompanyBranchOption>({
    key: ["profiles", "branches"],
    endpoint: ENDPOINT + `company-branches/options/`,
  });
