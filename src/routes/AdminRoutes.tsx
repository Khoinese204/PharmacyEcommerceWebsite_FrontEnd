import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "../pages/admin/DashboardPage";
import UserManagementPage from "../pages/admin/UserManagementPage";
// ... import các trang khác

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin">
        {/* Khi vào /admin thì chuyển hướng đến /admin/dashboard */}
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="users" element={<UserManagementPage />} />
        {/* ...các route khác */}
      </Route>
    </Routes>
  );
}
