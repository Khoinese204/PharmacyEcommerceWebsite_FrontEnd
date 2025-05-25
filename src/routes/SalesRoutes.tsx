import { Routes, Route, Navigate } from "react-router-dom";
import SalesLayout from "../components/layouts/SalesLayout";
import SalesDashboardPage from "../pages/sales/SalesDashboardPage";
import OrderConfirmPage from "../pages/sales/OrderConfirmPage";
import OrderDetailPage from "../pages/sales/OrderDetailPage";
import OrderListPage from "../pages/sales/OrderListPage";

export default function SalesRoutes() {
  return (
    <SalesLayout>
        <Routes>
            <Route path="/" element={<Navigate to="/sales/dashboard" />} />
            <Route path="/sales/dashboard" element={<SalesDashboardPage />} />
            <Route path="/sales/listorders" element={<OrderListPage />} />
            <Route path="/sales/orders" element={<OrderConfirmPage />} />
            <Route path="/sales/orders/:orderId" element={<OrderDetailPage />} />
        </Routes>
    </SalesLayout>
  );
}
