import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthRoutes from "./routes/AuthRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import SalesRoutes from "./routes/SalesRoutes";
import WarehouseRoutes from "./routes/WarehouseRoutes";
import CustomerRoutes from "./routes/CustomerRoutes";

function App() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user.role;

  const getDefaultRedirect = () => {
    switch (role) {
      case "Admin":
        return "/admin/dashboard";
      case "Sales":
        return "/sales/dashboard";
      case "Warehouse":
        return "/warehouse/dashboard";
      case "Customer":
        return "/";
      default:
        return "/auth";
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        {!token ? (
          <>
            <Route path="/auth/*" element={<AuthRoutes />} />
            <Route path="*" element={<Navigate to="/auth" />} />
          </>
        ) : (
          <>
            {role === "Admin" && (
              <Route path="/admin/*" element={<AdminRoutes />} />
            )}
            {role === "Sales" && (
              <Route path="/sales/*" element={<SalesRoutes />} />
            )}
            {role === "Warehouse" && (
              <Route path="/warehouse/*" element={<WarehouseRoutes />} />
            )}
            {role === "Customer" && (
              <Route path="/*" element={<CustomerRoutes />} />
            )}

            {/* Catch-all: nếu vào path không đúng thì tự động chuyển đúng trang theo role */}
            <Route path="*" element={<Navigate to={getDefaultRedirect()} />} />
          </>
        )}
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </BrowserRouter>
  );
}

export default App;
