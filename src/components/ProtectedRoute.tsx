import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import usePrivilege from "../hooks/usePrivilege";
import { Privilege } from "../types";
import PageLoader from "./PageLoader";

interface ProtectedRouteProps {
  requiredPrivilege?: Privilege;
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredPrivilege,
  children,
}) => {
  const { isAuthenticated, privileges, isLoading, logout } = useAuth();
  const { can } = usePrivilege();

  if (isLoading) {
    return <PageLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (privileges && requiredPrivilege && !can(requiredPrivilege)) {
    logout();
    return <Navigate to="/login" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
