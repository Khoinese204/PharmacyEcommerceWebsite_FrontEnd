import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "../pages/admin/DashboardPage";
import UserManagementPage from "../pages/admin/UserManagementPage";
import AddUserPage from "../pages/admin/AddUserPage";
import EditUserPage from "../pages/admin/EditUserPage";
import ViewUserPage from "../pages/admin/ViewUserPage";
// ... import các trang khác

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin">
        {/* Khi vào /admin thì chuyển hướng đến /admin/dashboard */}
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="users" element={<UserManagementPage />} />
        <Route path="users/add" element={<AddUserPage />} />
        <Route path="users/:id" element={<ViewUserPage />} />
        <Route path="users/:id/edit" element={<EditUserPage />} />
        {/* ...các route khác */}
      </Route>
    </Routes>
  );
}