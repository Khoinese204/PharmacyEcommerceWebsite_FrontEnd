import { Routes, Route, Navigate } from "react-router-dom";
import SalesLayout from "../components/layouts/SalesLayout";
import SalesDashboardPage from "../pages/sales/SalesDashboardPage";
import OrderDetailPage from "../pages/sales/OrderDetailPage";
import OrderListPage from "../pages/sales/OrderListPage";
import EditStatusPage from "../pages/sales/EditStatusPage";
import SalesAccountPage from "../pages/sales/SalesAccountPage";
export default function SalesRoutes() {
  return (
    // <SalesLayout>
    <Routes>
      <Route index element={<Navigate to="dashboard" />} />
      <Route path="/account" element={<SalesAccountPage />} />
      <Route path="/dashboard" element={<SalesDashboardPage />} />
      <Route path="/orders" element={<OrderListPage />} />
      <Route path="/orders/:orderId" element={<OrderDetailPage />} />
      <Route path="/orders/:orderId/editStatus" element={<EditStatusPage />} />
    </Routes>
    // </SalesLayout>
  );
}
