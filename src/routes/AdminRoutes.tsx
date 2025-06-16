import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "../pages/admin/DashboardPage";
import UserManagementPage from "../pages/admin/UserManagementPage";
import AddUserPage from "../pages/admin/AddUserPage";
import EditUserPage from "../pages/admin/EditUserPage";
import ViewUserPage from "../pages/admin/ViewUserPage";
import MedicineManagementPage from "../pages/admin/MedicineMangamentPage";
import AddMedicinePage from "../pages/admin/AddMedicinePage";
import CategoryManagementPage from "../pages/admin/CategoryManagementPage";
import CouponManagementPage from "../pages/admin/CouponManagementPage";
import WarehouseManagementPage from "../pages/admin/WarehouseManagementPage";
import RevenueManagementPage from "../pages/admin/RevenueManagementPage";
import CustomerManagementPage from "../pages/admin/CustomerManagementPage";
import PriceHistoryPage from "../pages/admin/PriceHistoryPage";
import ProductPriceHistoryPage from "../pages/admin/ProductPriceHistoryPage";
import AccountPage from "../pages/admin/AdminAccountPage";
import AdminAccountPage from "../pages/admin/AdminAccountPage";
// ... import các trang khác

export default function AdminRoutes() {
  return (
    <Routes>
      {/* Khi vào /admin thì chuyển hướng đến /admin/dashboard */}
      <Route index element={<Navigate to="dashboard" />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/account" element={<AdminAccountPage />} />
      {/* Các route quản lý người dùng */}
      <Route path="/users" element={<UserManagementPage />} />
      <Route path="/users/add" element={<AddUserPage />} />
      <Route path="/users/:id" element={<ViewUserPage />} />
      <Route path="/users/:id/edit" element={<EditUserPage />} />
      <Route path="/medicines" element={<MedicineManagementPage />} />
      <Route path="/medicines/add" element={<AddMedicinePage />} />

      {/* ...các route khác */}
      <Route path="/categories" element={<CategoryManagementPage />} />
      <Route path="/coupons" element={<CouponManagementPage />} />
      <Route path="/warehouse" element={<WarehouseManagementPage />} />
      <Route path="/revenue" element={<RevenueManagementPage />} />
      <Route path="/customers" element={<CustomerManagementPage />} />
      <Route path="/price-history" element={<PriceHistoryPage />} />
      <Route path="/price-history/:id" element={<ProductPriceHistoryPage />} />
    </Routes>
  );
}
