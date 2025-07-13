import NotFound from "@/pages/NotFound";
import AddPaymentVoucher from "@/pages/payment-vouchers/AddPaymentVoucher";
import EditPaymentVoucher from "@/pages/payment-vouchers/EditPaymentVoucher";
import PaymentVoucherDetails from "@/pages/payment-vouchers/PaymentVoucherDetails";
import PaymentVouchers from "@/pages/payment-vouchers/PaymentVouchers";
import { createBrowserRouter, Outlet, RouteObject } from "react-router-dom";
import Layout from "../Layout";
import ProtectedRoute from "../components/ProtectedRoute";
import { AuthProvider } from "../context/AuthContext";
import DashboardPage from "../pages/Dashboard";
import Login from "../pages/Login";
import AddClient from "../pages/clients/AddClient";
import ClientDetails from "../pages/clients/ClientDetails";
import Clients from "../pages/clients/Clients";
import DeleteClient from "../pages/clients/DeleteClient";
import EditClient from "../pages/clients/EditClient";
import AddDriver from "../pages/drivers/AddDriver";
import DeleteDriver from "../pages/drivers/DeleteDriver";
import DriverDetails from "../pages/drivers/DriverDetails";
import Drivers from "../pages/drivers/Drivers";
import EditDriver from "../pages/drivers/EditDriver";
import AddRecipient from "../pages/recipient/AddRecipient";
import DeleteRecipient from "../pages/recipient/DeleteRecipient";
import EditRecipient from "../pages/recipient/EditRecipient";
import RecipientDetails from "../pages/recipient/RecipientDetails";
import Recipients from "../pages/recipient/Recipients";
import AddShipment from "../pages/shipments/AddShipment";
import DeleteShipment from "../pages/shipments/DeleteShipment";
import EditShipment from "../pages/shipments/EditShipment";
import ShipmentDetails from "../pages/shipments/ShipmentDetails";
import Shipments from "../pages/shipments/Shipments";
import AddUser from "../pages/users/AddUser";
import DeleteUser from "../pages/users/DeleteUser";
import EditUser from "../pages/users/EditUser";
import UserDetails from "../pages/users/UserDetails";
import Users from "../pages/users/Users";

const routes: RouteObject[] = [
  {
    element: (
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    ),
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        element: (
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        ),
        children: [
          {
            children: [
              {
                path: "/",
                element: (
                  <ProtectedRoute requiredPrivilege="dashboard:view">
                    <DashboardPage />
                  </ProtectedRoute>
                ),
              },
              {
                path: "/dashboard",
                element: (
                  <ProtectedRoute requiredPrivilege="dashboard:view">
                    <DashboardPage />
                  </ProtectedRoute>
                ),
              },
              {
                path: "/shipments",
                element: <Outlet />,
                children: [
                  {
                    index: true,
                    element: (
                      <ProtectedRoute requiredPrivilege="shipments:view">
                        <Shipments />
                      </ProtectedRoute>
                    ),
                  },
                  {
                    path: "all",
                    element: (
                      <ProtectedRoute requiredPrivilege="shipments:view">
                        <Shipments />
                      </ProtectedRoute>
                    ),
                  },
                  {
                    path: ":shipmentName",
                    element: (
                      <ProtectedRoute requiredPrivilege="shipments:view">
                        <Shipments />
                      </ProtectedRoute>
                    ),
                  },
                  {
                    path: "shipment-details/:shipmentId",
                    element: (
                      <ProtectedRoute requiredPrivilege="shipments:view">
                        <ShipmentDetails />
                      </ProtectedRoute>
                    ),
                  },
                  {
                    path: "add-shipment",
                    element: (
                      <ProtectedRoute requiredPrivilege="shipments:create">
                        <AddShipment />
                      </ProtectedRoute>
                    ),
                  },
                  {
                    path: "edit-shipment/:shipmentId",
                    element: (
                      <ProtectedRoute requiredPrivilege="shipments:edit">
                        <EditShipment />
                      </ProtectedRoute>
                    ),
                  },
                  {
                    path: "delete-shipment/:shipmentId",
                    element: (
                      <ProtectedRoute requiredPrivilege="shipments:delete">
                        <DeleteShipment />
                      </ProtectedRoute>
                    ),
                  },
                ],
              },
              {
                path: "/payment-vouchers",
                element: <Outlet />,
                children: [
                  {
                    index: true,
                    element: (
                      <ProtectedRoute requiredPrivilege="payment-vouchers:view">
                        <PaymentVouchers />
                      </ProtectedRoute>
                    ),
                  },
                  {
                    path: "all",
                    element: (
                      <ProtectedRoute requiredPrivilege="payment-vouchers:view">
                        <PaymentVouchers />
                      </ProtectedRoute>
                    ),
                  },
                  {
                    path: "add",
                    element: (
                      <ProtectedRoute requiredPrivilege="payment-vouchers:create">
                        <AddPaymentVoucher />
                      </ProtectedRoute>
                    ),
                  },
                  {
                    path: "edit/:paymentVoucherId",
                    element: (
                      <ProtectedRoute requiredPrivilege="payment-vouchers:edit">
                        <EditPaymentVoucher />
                      </ProtectedRoute>
                    ),
                  },
                  {
                    path: "details/:paymentVoucherId",
                    element: (
                      <ProtectedRoute requiredPrivilege="payment-vouchers:view">
                        <PaymentVoucherDetails />
                      </ProtectedRoute>
                    ),
                  },
                ],
              },
              {
                path: "/users",
                element: <Outlet />,
                children: [
                  {
                    index: true,
                    element: (
                      <ProtectedRoute requiredPrivilege="users:view">
                        <Users />
                      </ProtectedRoute>
                    ),
                  },
                  {
                    path: "all",
                    element: (
                      <ProtectedRoute requiredPrivilege="users:view">
                        <Users />
                      </ProtectedRoute>
                    ),
                  },
                  {
                    path: "add-user",
                    element: (
                      <ProtectedRoute requiredPrivilege="users:create">
                        <AddUser />
                      </ProtectedRoute>
                    ),
                  },
                  {
                    path: "edit-user/:userId",
                    element: (
                      <ProtectedRoute requiredPrivilege="users:edit">
                        <EditUser />
                      </ProtectedRoute>
                    ),
                  },
                  {
                    path: "user-details/:userId",
                    element: (
                      <ProtectedRoute requiredPrivilege="users:view">
                        <UserDetails />
                      </ProtectedRoute>
                    ),
                  },
                  {
                    path: "delete-user/:userId",
                    element: (
                      <ProtectedRoute requiredPrivilege="users:delete">
                        <DeleteUser />
                      </ProtectedRoute>
                    ),
                  },
                ],
              },
              {
                path: "/drivers",
                element: <Outlet />,
                children: [
                  {
                    index: true,
                    element: (
                      <ProtectedRoute requiredPrivilege="drivers:view">
                        <Drivers />
                      </ProtectedRoute>
                    ),
                  },
                  {
                    path: "driver-details/:driverId",
                    element: (
                      <ProtectedRoute requiredPrivilege="drivers:view">
                        <DriverDetails />
                      </ProtectedRoute>
                    ),
                  },
                  {
                    path: "add-driver",
                    element: (
                      <ProtectedRoute requiredPrivilege="drivers:create">
                        <AddDriver />
                      </ProtectedRoute>
                    ),
                  },
                  {
                    path: "edit-driver/:driverId",
                    element: (
                      <ProtectedRoute requiredPrivilege="drivers:edit">
                        <EditDriver />
                      </ProtectedRoute>
                    ),
                  },
                  {
                    path: "delete-driver/:driverId",
                    element: (
                      <ProtectedRoute requiredPrivilege="drivers:delete">
                        <DeleteDriver />
                      </ProtectedRoute>
                    ),
                  },
                ],
              },
              {
                path: "/clients",
                element: <Outlet />,
                children: [
                  {
                    index: true,
                    element: (
                      <ProtectedRoute requiredPrivilege="clients:view">
                        <Clients />
                      </ProtectedRoute>
                    ),
                  },
                  {
                    path: "all",
                    element: (
                      <ProtectedRoute requiredPrivilege="clients:view">
                        <Clients />
                      </ProtectedRoute>
                    ),
                  },
                  {
                    path: "add-client",
                    element: (
                      <ProtectedRoute requiredPrivilege="clients:create">
                        <AddClient />
                      </ProtectedRoute>
                    ),
                  },
                  {
                    path: "edit-client/:clientId",
                    element: (
                      <ProtectedRoute requiredPrivilege="clients:edit">
                        <EditClient />
                      </ProtectedRoute>
                    ),
                  },
                  {
                    path: "client-details/:clientId",
                    element: (
                      <ProtectedRoute requiredPrivilege="clients:view">
                        <ClientDetails />
                      </ProtectedRoute>
                    ),
                  },
                  {
                    path: "delete-client/:clientId",
                    element: (
                      <ProtectedRoute requiredPrivilege="clients:delete">
                        <DeleteClient />
                      </ProtectedRoute>
                    ),
                  },
                ],
              },
              {
                path: "/recipients",
                element: <Outlet />,
                children: [
                  {
                    index: true,
                    element: (
                      <ProtectedRoute requiredPrivilege="recipients:view">
                        <Recipients />
                      </ProtectedRoute>
                    ),
                  },
                  {
                    path: "create",
                    element: (
                      <ProtectedRoute requiredPrivilege="recipients:create">
                        <AddRecipient />
                      </ProtectedRoute>
                    ),
                  },
                  {
                    path: ":recipientId",
                    element: <RecipientDetails />,
                  },
                  {
                    path: ":recipientId/delete",
                    element: <DeleteRecipient />,
                  },
                  {
                    path: ":recipientId/edit",
                    element: <EditRecipient />,
                  },
                ],
              },
            ],
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
