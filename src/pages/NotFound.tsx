import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import usePrivilege from "../hooks/usePrivilege";

const NotFound = () => {
  const navigate = useNavigate();
  const { privileges } = useAuth();
  const { can } = usePrivilege();

  const handleGoToHome = () => {
    if (privileges) {
      if (can("dashboard:view")) {
        navigate("/dashboard");
      } else if (can("shipments:view")) {
        navigate("/shipments");
      } else if (can("payment-vouchers:view")) {
        navigate("/payment-vouchers");
      } else if (can("users:view")) {
        navigate("/users");
      } else if (can("drivers:view")) {
        navigate("/drivers");
      } else if (can("clients:view")) {
        navigate("/clients");
      } else if (can("recipients:view")) {
        navigate("/recipients");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-9xl font-bold">404</h1>
      <h2 className="text-2xl font-bold">الصفحة غير موجودة</h2>
      <button
        className="mt-4 px-4 py-2 bg-[#DD7E1F] text-white rounded"
        onClick={handleGoToHome}
      >
        العودة للرئيسية
      </button>
    </div>
  );
};

export default NotFound;
