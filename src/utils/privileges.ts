import { Privilege, RoleName } from "@/types";

type RoleConfig = {
  [role in RoleName]: {
    privileges: Privilege[];
  };
};

const rolePrivileges: RoleConfig = {
  super_admin: {
    privileges: [
      "dashboard:view",
      "users:view",
      "users:create",
      "users:edit",
      "users:delete",
      "shipments:view",
      "shipments:create",
      "shipments:edit",
      "shipments:delete",
      "drivers:view",
      "drivers:create",
      "drivers:edit",
      "drivers:delete",
      "clients:view",
      "clients:create",
      "clients:edit",
      "clients:delete",
      "recipients:view",
      "recipients:create",
      "recipients:edit",
      "recipients:delete",
      "payment-vouchers:view",
      "payment-vouchers:create",
      "payment-vouchers:approve",
    ],
  },
  staff: {
    privileges: [
      "recipients:view",
      "recipients:create",
      "drivers:view",
      "drivers:create",
      "drivers:edit",
      "payment-vouchers:view",
      "payment-vouchers:create",
      "payment-vouchers:approve",
      "shipments:view",
      "shipments:create",
      "shipments:edit",
      "shipments:delete",
    ],
  },
  active: {
    privileges: [
      "recipients:view",
      "recipients:create",
      "drivers:view",
      "drivers:create",
      "drivers:edit",
      "payment-vouchers:view",
      "payment-vouchers:create",
      "shipments:view",
      "shipments:create",
      "shipments:edit",
    ],
  },
};

export default rolePrivileges;
