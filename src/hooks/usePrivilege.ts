import { Privilege } from "@/types";
import { useAuth } from "./useAuth";

const usePrivilege = () => {
  const { privileges, user } = useAuth();

  const can = (privilege: Privilege) => {
    return user?.is_superuser || privileges?.has(privilege);
  };

  return {
    can,
  };
};

export default usePrivilege;
